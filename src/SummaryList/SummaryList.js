import React from "react";
import ApiContext from "../ApiContext";
import "./SummaryList.css";
import { countTotalForList, getItemsForList } from "../app-helpers";
export default class SummaryList extends React.Component {
  static contextType = ApiContext;

  render() {
    const { listId } = this.props;
    const { items = [] } = this.context;
    //const list = findList(lists, listId)
    const summaryTotal = countTotalForList(items, listId);

    const summaryDisplay =
      summaryTotal.length > 8 ? (
        <>
          {summaryTotal.slice(0, 7)}...
          <br /> {summaryTotal.slice(8, summaryTotal.length)}
        </>
      ) : (
        summaryTotal
      );

    const listItems = getItemsForList(items, listId).filter(
      (item) => item.calc
    );

    return (
      <div className="SummaryList">
        <div className="Summary-Total">
          <h3>BudGit Total:</h3>
          <h4> ${summaryDisplay} </h4>
        </div>
        <div className="Summary-Items">
          Items in your BudGit Total:
          <ul className="items-scroll">
            {listItems.map((item, i) => (
              <li key={`${item.id}-summary${i}`}>{item.item_name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
