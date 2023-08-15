import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setColumns } from "../redux/columnsSlice";

const KanbanViewPage = () => {
  const statuses = ["Not Started", "Working on it", "Stuck", "Done"];
  const statusColors = ["#fff", "#eddd41", "#ddabc2", "#5bdb47"];

  const columns = useSelector((state) => state.columns);

  const [selectedTagFilter, setSelectedTagFilter] = useState("");
  const dispatch = useDispatch();

  const handleStatusChange = (index, newStatus) => {
    const updatedColumns = columns.map((column, columnIndex) =>
      columnIndex === index ? { ...column, status: newStatus } : column
    );
    dispatch(setColumns(updatedColumns));
  };

  const handleAddColumn = (newColumn) => {
    const updatedColumns = [...columns, newColumn];
    dispatch(setColumns(updatedColumns));
  };

  const handleAddTag = (columnIndex) => {
    const updatedColumns = columns.map((column, i) =>
      i === columnIndex
        ? {
            ...column,
            tags: [...column.tags, column.newTag]
          }
        : column
    );
    dispatch(setColumns(updatedColumns));
  };

  const handleCellChange = (columnIndex, field, newValue) => {
    const updatedColumns = columns.map((column, i) =>
      i === columnIndex ? { ...column, [field]: newValue } : column
    );
    dispatch(setColumns(updatedColumns));
  };

  const handleRemoveTag = async (columnIndex, tagIndex) => {
    const updatedColumns = columns.map((column, i) =>
      i === columnIndex
        ? { ...column, tags: column.tags.filter((_, j) => j !== tagIndex) }
        : column
    );
    dispatch(setColumns(updatedColumns));
  };

  const handleDeleteRow = async (index) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    dispatch(setColumns(updatedColumns));
  };

  return (
    <div className="kanban-view-page">
      <nav className="nav-bar">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </nav>
      <div className="kanban-column">
        <h3>This Month</h3>

        <div>
          <label className="filter">
            Filter:
            <select
              className="filter-select"
              value={selectedTagFilter}
              onChange={(e) => setSelectedTagFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="school">School</option>
              <option value="non-profit">Non-profit</option>
            </select>
          </label>
        </div>

        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {columns
              .filter(
                (column) =>
                  selectedTagFilter === "" ||
                  column.tags.includes(selectedTagFilter)
              )

              .map((column, columnIndex) => (
                <tr key={column._id}>
                  <td>
                    <input
                      type="text"
                      value={column.creative}
                      onChange={(e) =>
                        handleCellChange(
                          columnIndex,
                          "creative",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={column.owner}
                      onChange={(e) =>
                        handleCellChange(columnIndex, "owner", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={column.dueDate}
                      onChange={(e) =>
                        handleCellChange(columnIndex, "dueDate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={column.status}
                      style={{
                        backgroundColor:
                          statusColors[statuses.indexOf(column.status)]
                      }}
                      onChange={(e) =>
                        handleStatusChange(columnIndex, e.target.value)
                      }
                    >
                      {statuses.map((status, idx) => (
                        <option key={idx} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteRow(columnIndex)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <label>
                      Select Tag:
                      <select
                        value={column.newTag}
                        onChange={(e) => {
                          const updatedColumns = columns.map((col, i) =>
                            i === columnIndex
                              ? { ...col, newTag: e.target.value }
                              : col
                          );
                          dispatch(setColumns(updatedColumns));
                        }}
                      >
                        <option value="">Select Tag</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="school">School</option>
                        <option value="non-profit">Non-profit</option>
                      </select>
                    </label>
                    {column.tags.length === 0 ? (
                      <button onClick={() => handleAddTag(columnIndex)}>
                        Add
                      </button>
                    ) : (
                      <button
                        className="remove-tag-button"
                        onClick={() => handleRemoveTag(columnIndex, 0)}
                      >
                        Remove Tag
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            <tr>
              <td>
                <button
                  className="add-task-button add-column-button"
                  onClick={() =>
                    handleAddColumn({
                      creative: "",
                      owner: "",
                      dueDate: "DD/MM/YYYY",
                      status: "",
                      tags: []
                    })
                  }
                >
                  Add Column
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KanbanViewPage;
