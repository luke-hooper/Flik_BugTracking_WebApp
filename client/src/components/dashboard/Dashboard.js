import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getMyTickets } from "../../actions/tickets";

import UrgencyChart from "./UrgencyChart";
import StatusChart from "./StatusChart";
import TableItems from "./TableItems";

const Dashboard = ({ getMyTickets, tickets: { tickets, loading } }) => {
  useEffect(() => {
    getMyTickets();
  }, [getMyTickets]);

  const renderRows = type => {
    const importantTickets = tickets.filter(
      ticket => ticket.priority === "high"
    );
    const openTickets = tickets.filter(
      ticket => ticket.status === "inProgress"
    );
    if (type === "important") {
      return importantTickets.length > 0 ? (
        importantTickets.map(ticket => (
          <TableItems tickets={ticket} key={ticket._id} />
        ))
      ) : (
        <tbody>
          <tr>
            <td className='span' colSpan='4'>
              <h2>No High Priority Tickets Found!</h2>
            </td>
          </tr>
        </tbody>
      );
    } else if (type === "open") {
      return openTickets.length > 0 ? (
        openTickets.map(ticket => (
          <TableItems tickets={ticket} key={ticket._id} />
        ))
      ) : (
        <tbody>
          <tr>
            <td className='span' colSpan='4'>
              <h2>No Open Tickets Found!</h2>
            </td>
          </tr>
        </tbody>
      );
    }
  };

  return (
    <Fragment>
      {loading && tickets === null ? (
        <h1>Content Loading ...</h1>
      ) : (
        <Fragment>
          <h1 className='large'>Dashboard</h1>
          <p className='medium'>
            <i className='fas fa-user text-primary'></i> Welcome
          </p>
          <div className=' table-wrapper'>
            <div className='left-wrapper'>
              <h2 className='center '>Ticket Priority Overview</h2>
              <div className='wrapper'>
                <UrgencyChart />
              </div>
              <h2 className='center '>High Priority Tickets</h2>
              <div className='wrapper'>
                <div className='tickets'>
                  {tickets.length > 0 ? (
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Name</th>
                          <th scope='col'>Description</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Priority</th>
                        </tr>
                      </thead>
                      {renderRows("important")}
                    </table>
                  ) : (
                    <h2>No Tickets Found! </h2>
                  )}
                </div>
              </div>
            </div>
            <div className='right-wrapper'>
              <h2 className='center '>Ticket Status Overview</h2>
              <div className='wrapper'>
                <StatusChart />
              </div>
              <h2 className='center '>Open Tickets Overview</h2>
              <div className='wrapper'>
                <div className='tickets'>
                  {tickets.length > 0 ? (
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Name</th>
                          <th scope='col'>Description</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Priority</th>
                        </tr>
                      </thead>
                      {renderRows("open")}
                    </table>
                  ) : (
                    <h2>No Tickets Found! </h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getMyTickets: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tickets: state.tickets
});

export default connect(mapStateToProps, { getMyTickets })(Dashboard);