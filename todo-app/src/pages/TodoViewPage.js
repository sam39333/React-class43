import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setColumns } from "../redux/columnsSlice";

const TodoViewPage = () => {
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

  const handleSaveColumns = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/save-columns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columns }) 
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  const tagsCount = columns.reduce((count, column) => {
    column.tags.forEach((tag) => {
      count[tag] = (count[tag] || 0) + 1;
    });
    return count;
  }, {});

  const tagOptions = ["work", "personal", "school", "non-profit"];

  return (
    <div className="todo-view-page">
      <nav className="nav-bar">
        <div>
          <Link to="/" className="nav-link">
            <img
              src="https://static.thenounproject.com/png/1228447-200.png"
              alt="Home Icon"
              className="icon"
            />
          </Link>

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

          {tagOptions.map((tag) => (
            <div key={tag} className="tag-option">
              <span
                className={`tag-label ${
                  selectedTagFilter === tag ? "selected" : ""
                }`}
                onClick={() => setSelectedTagFilter(tag)}
              >
                {tag}
              </span>
              {selectedTagFilter === tag && (
                <span className="tag-counter">{tagsCount[tag]}</span>
              )}
            </div>
          ))}
        </div>
      </nav>
      <div className="todo-column">
        <h3>This Month</h3>

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
                    <label className="tag">
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
                      <button
                        className="add-tag-button"
                        onClick={() => handleAddTag(columnIndex)}
                      >
                        <img
                          src="https://cdn2.iconfinder.com/data/icons/interface-part-2/32/plus-512.png"
                          alt="Add Tag Icon"
                          className="icon"
                        />
                      </button>
                    ) : (
                      <button
                        className="remove-tag-button"
                        onClick={() => handleRemoveTag(columnIndex, 0)}
                      >
                        <img
                          src="https://cdn2.iconfinder.com/data/icons/interface-part-2/32/minus-512.png"
                          alt="remove Tag Icon"
                          className="icon"
                        />
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
                  Add Task
                </button>
              </td>
              <td>
                <button className="save-button" onClick={handleSaveColumns}>
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoViewPage;
