import React, { useState, useMemo, useEffect } from 'react';
import { IS_SURVEY_TYPE_GP } from '../../resources/questions/QuestionBanks';
import { getResponseData } from '../../actions/getResponseData';
import { downloadDataAsCsv } from '../../actions/downloadDataAsCSV';

interface ResponseItem {
  id: string;
  createdAt: string;
  data: {
    inputs: Record<string, any>;
    scores: Record<string, any>;
  };
  fileName: string;
  personal: {
    address: string;
    detailsCorrect: boolean;
    email: string;
    name: string;
    reuseData: boolean;
  };
  url: string;
}

const ResponseList: React.FC = () => {
  // State for fetched responses
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch stub
  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getResponseData();
      const data: ResponseItem[] = res;
      setResponses(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // Selection, pagination, and display state
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPersonal, setShowPersonal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Derive column keys
  const inputKeys = useMemo(
    () => (responses[0] ? Object.keys(responses[0].data.inputs) : []),
    [responses]
  );
  const scoreKeys = useMemo(
    () => (responses[0] ? Object.keys(responses[0].data.scores) : []),
    [responses]
  );

  // Flatten data for download
  const flattenedData = useMemo(
    () =>
      responses.map((it) => ({
        id: it.id,
        createdAt: it.createdAt,
        ...it.data.inputs,
        ...it.data.scores,
        fileName: it.fileName,
        url: it.url,
        name: it.personal.name,
        email: it.personal.email,
        address: it.personal.address,
      })),
    [responses]
  );

  // Pagination calculations
  const totalPages = Math.ceil(responses.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const pageItems = responses.slice(pageStart, pageStart + itemsPerPage);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked ? responses.map((r) => r.id) : []);
  };
  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setSelected((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  // Actions
  const handleDownloadAll = () => {
    console.log(flattenedData);
    downloadDataAsCsv(flattenedData, `Response_List_All_${IS_SURVEY_TYPE_GP ? "GP" : "Public"}`);

  }
  const handleDownloadSelected = () => {
    downloadDataAsCsv(flattenedData.filter((d) => selected.includes(d.id)), 
    `Response_List_Selected_${IS_SURVEY_TYPE_GP ? "GP" : "Public"}`);
  }
    
  const handleDelete = () => {
    setResponses((prev) => prev.filter((r) => !selected.includes(r.id)));
    setSelected([]);
    if (currentPage > Math.ceil((responses.length - selected.length) / itemsPerPage)) {
      setCurrentPage((p) => Math.max(1, p - 1));
    }
  };

  return (
    <div className='container is-fluid'>
      <div className="m-6 px-6">
        <h1 className='title mb-6'>Response List - {IS_SURVEY_TYPE_GP ? "GP Survey" : "Public Survey"}</h1>
        {/* Controls */}
        <div className="field is-grouped is-grouped-multiline mb-4">
          <div className="control">
            <button className="button is-primary" onClick={handleDownloadAll}>
              Download All
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link"
              onClick={handleDownloadSelected}
              disabled={!selected.length}
            >
              Download Selected
            </button>
          </div>
          <div className="control">
            <button
              className="button is-danger"
              onClick={handleDelete}
              disabled={!selected.length}
            >
              Delete
            </button>
          </div>
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={showPersonal}
                onChange={() => setShowPersonal((v) => !v)}
              />
              <span className="ml-2">Show Personal Details</span>
            </label>
          </div>
          <div className="control">
            <div className="select">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[10, 20, 30, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && <p>Loading...</p>}
        {error && <p className="has-text-danger">{error}</p>}

        {/* Table */}
        <div className="table-container">
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th
                  className="has-background-white"
                  style={{ position: 'sticky', left: 0, zIndex: 3 }}
                >
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selected.length === responses.length && !!responses.length
                    }
                  />
                </th>
                <th
                  className="has-background-white"
                  style={{ position: 'sticky', left: 34, zIndex: 3 }}
                >
                  ID
                </th>
                {showPersonal && (
                  <>
                    <th
                      className="has-background-white"
                      style={{ position: 'sticky', left: '120px', zIndex: 3 }}
                    >
                      Name
                    </th>
                    <th>Email</th>
                    <th>Address</th>
                  </>
                )}
                {inputKeys.map((k) => (
                  <th key={k}>{k}</th>
                ))}
                {scoreKeys.map((k) => (
                  <th key={k}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => (
                <tr key={item.id}>
                  <td
                    className="has-background-white"
                    style={{ position: 'sticky', left: 0, zIndex: 2 }}
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={(e) => handleSelectRow(e, item.id)}
                    />
                  </td>
                  <td
                    className="has-background-white"
                    style={{ position: 'sticky', left: 34, zIndex: 2 }}
                  >
                    {item.id}
                  </td>
                  {showPersonal && (
                    <>
                      <td
                        className="has-background-white"
                        style={{ position: 'sticky', left: '120px', zIndex: 2 }}
                      >
                        {item.personal.name}
                      </td>
                      <td>{item.personal.email}</td>
                      <td>{item.personal.address}</td>
                    </>
                  )}
                  {inputKeys.map((k) => (
                    <td key={k}>{item.data.inputs[k]}</td>
                  ))}
                  {scoreKeys.map((k) => (
                    <td key={k}>{item.data.scores[k]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="pagination is-centered mt-4" role="navigation">
          <button
            className="pagination-previous button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="pagination-next button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <ul className="pagination-list">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  className={`pagination-link button ${currentPage === i + 1 ? 'is-current' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponseList;