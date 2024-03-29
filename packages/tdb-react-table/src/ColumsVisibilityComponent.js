import React from "react";

import { Dropdown, Form} from "react-bootstrap";
import {TbColumns} from "react-icons/tb"

const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      setHiddenColumns,
      "aria-labelledby": labeledBy,
      onChange,
      title,
      checked
    },
    ref
  ) => {
    const label = checked ? "Hide All" : "Show All"

    const setHideShow = (evt)=>{
        if(setHiddenColumns)setHiddenColumns("__ALL__",!checked)
        onChange(evt)
    }

    return (<div
        ref={ref}
        style={style}
        className={`${className} CheckboxMenu`}
        aria-labelledby={labeledBy}
      >
        <div
          className="d-flex flex-column"
          style={{ maxHeight: "calc(100vh)", overflow: "none" }}
        >
          <ul
            className="list-unstyled flex-shrink mb-0"
            style={{ overflow: "auto" }}
          >
            {children}
          </ul>
          <div className="dropdown-item border-top pt-2 pb-0">
          <Form.Group className="dropdown-item mb-0 p-0" >
                <Form.Check
                type="checkbox"
                label={"All"}
                checked={checked}
                onChange={setHideShow}
                className= "table__columns__component"
                />
        </Form.Group>
          </div>
        </div>
    </div>
    );
  }
);

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange , setHiddenColumns}, ref) => {
    function hideShowColumn(evt){
        if(setHiddenColumns)setHiddenColumns(id,evt.target.checked)
        onChange(evt)
    }

    return (
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          type="checkbox"
          label={children}
          checked={checked}
          onChange={hideShowColumn}
          className= "table__columns__component"
        />
      </Form.Group>
    );
  }
);


export const CheckboxDropdown = ({setHiddenColumns, allColumns,getToggleHideAllColumnsProps }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="bg-light text-dark">
        <TbColumns></TbColumns>
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CheckboxMenu}
        setHiddenColumns={setHiddenColumns}
        {...getToggleHideAllColumnsProps()}
      >
        {allColumns.map(column => {
          if(column.id!=="__ACTIONS__"){
            return <Dropdown.Item
              key={column.id}
              as={CheckDropdownItem}
              setHiddenColumns={setHiddenColumns}
              id={column.id}
              {...column.getToggleHiddenProps()}>
              {column.Header}
            </Dropdown.Item>
          }
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
