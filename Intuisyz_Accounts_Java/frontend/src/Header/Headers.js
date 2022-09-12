import React from 'react';
import {
  useHistory,
  useLocation,
  Redirect,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

{/* storing session details*/}
let urlDetails = window.location.href;
let myArray = urlDetails.split('?');

if (myArray.length > 1) {
  let urlVal = myArray[1].split('&');

  if (urlVal[0].split('=')[0] == 'CompanyName') {
    sessionStorage.setItem('CompanyName', urlVal[0].split('=')[1]);
  }

  if (urlVal[1].split('=')[0] == 'logDetails') {
    sessionStorage.setItem('logDetails', urlVal[1].split('=')[1]);
  }

  if (urlVal[2].split('=')[0] == 'tdsIdVal') {
    sessionStorage.setItem('tdsIdVal', urlVal[2].split('=')[1]);
  }

  if (urlVal[3].split('=')[0] == 'gstIdVal') {
    sessionStorage.setItem('gstIdVal', urlVal[3].split('=')[1]);
  }

  if (urlVal[4].split('=')[0] == 'cashIdVal') {
    sessionStorage.setItem('cashIdVal', urlVal[4].split('=')[1]);
  }

  if (urlVal[5].split('=')[0] == 'CustId') {
    sessionStorage.setItem('CustId', urlVal[5].split('=')[1]);
  }
}

{/* end of storing session details */}

if (sessionStorage.getItem('CompanyName') !== null)
  {
    localStorage.setItem('CompanyName',sessionStorage.getItem('CompanyName'));
  }
  if (sessionStorage.getItem('logDetails') !== null)
  {
    localStorage.setItem('logDetails',sessionStorage.getItem('logDetails'));
  }
  if (sessionStorage.getItem('tdsIdVal') !== null)
  {
    localStorage.setItem('tdsIdVal',sessionStorage.getItem('tdsIdVal'));
  }
  if (sessionStorage.getItem('gstIdVal') !== null)
  {
    localStorage.setItem('gstIdVal',sessionStorage.getItem('gstIdVal'));
  }
  if (sessionStorage.getItem('cashIdVal') !== null)
  {
    localStorage.setItem('cashIdVal',sessionStorage.getItem('cashIdVal'));
  }
  if (sessionStorage.getItem('CustId') !== null)
  {
    localStorage.setItem('CustId',sessionStorage.getItem('CustId'));
  }

function Headers() {
  let history = useHistory();
  console.log('history.length ',history.length);

  {/*document.body.onmousedown = ( e ) => { // For mousemiddlebuttonclick
    console.log('e.button = ',e.button);
    console.log('e = ',e);
    console.log('e.path = ',e.path);
    console.log('e.path[0] = ',e.path[0]);
    console.log('e.path[1] = ',e.path[1]);
    console.log('e.target = ',e.target);
    console.log('e.target.innerHTML = ',e.target.innerHTML);
    //console.log('location.href = ',location.href);
    console.log('window.location.href = ',window.location.href);
    console.log('window.location = ',window.location);
    console.log('history.length ',history.length);

    if( e.button === 1 ) {
      // do something on middle mouse button click
      console.log('iddle button of mouse is clicked');
      console.log('e = ',e);
      console.log('e.path = ',e.path);
      console.log('e.path[0] = ',e.path[0]);
      console.log('e.path[1] = ',e.path[1]);
      console.log('e.target = ',e.target);
      console.log('e.target.innerHTML = ',e.target.innerHTML);
      //console.log('location.href = ',location.href);
      console.log('window.location.href = ',window.location.href);
      window.open(
        e.path[1],
        '_blank' // <- This is what makes it open in a new window.
      );
    }

  }*/}

  return (
    <div>
      <div
        style={{
          background: 'url(../img/header-bg.jpg) repeat-x center center',
        }}
      >
        <div className="navbar-inner">
          <div className="container-fluid">
            {/* <a
              onClick={(e) => {
                history.push({
                  pathname: '/',
                });
              }}
              id="brand"
            >
              CRM Accounting
            </a> */}
             <Link id="brand" to="/">              
              <span>CRM Accounting</span>
          </Link> 
              {/*  <Link id="brand"
                      to={`/?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      CRM Accounting
                      </Link>   */}       
            <ul className="nav pull-right">
              <li className=" dropdown dropdownmargin">
                {/* <a
                  onClick={(e) => {
                    history.push({
                      pathname: '/',
                    });
                  }}
                >
                  CRM Dashboard
                </a> */}
                 <Link to="/">
                  <span>CRM Dashboard</span>
                </Link> 
               {/* <Link
                      to={`/?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Dashboard
                      </Link>  */}              
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="navigation">
        <div className="container-fluid">
           <a
            href="#"
            className="toggle-nav"
            rel="tooltip"
            data-placement="bottom"
            title="Toggle navigation"
          >
            <i className="fa fa-bars" />
                      </a> 
                                <ul className="main-nav">
                                   {/* <Link
                      to={`/?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                      className="toggle-nav"
                      rel="tooltip"
                      data-placement="bottom"
                      title="Toggle navigation"
                    >
                      <i className="fa fa-bars" />
                      </Link> */}
          {/* <ul className="main-nav"> */}
            <li>
              {/* <a
                onClick={(e) => {
                  history.push({
                    pathname: '/',
                  });
                }}
              >
                <span>Dashboard</span>
              </a> */}
               <Link to="/">
                <span>Dashboard</span>
                </Link> 
              {/* <Link
                      to={`/?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Dashboard
                      </Link>   */}           
            </li>
            <li>
              {/* <a
                onClick={(e) => {
                  history.push({
                    pathname: '/ac_dashboard',
                  });
                }}
              >
                <span>Accounts Dashboard</span>
              </a> */}
              {/*
document.getElementById("mylink").onclick = function(evnt) {
    if (
        evnt.ctrlKey || 
        evnt.shiftKey || 
        evnt.metaKey || 
        (evnt.button && evnt.button == 1)
    ){
      <Link
      to={`ac_dashboard?CompanyName=${sessionStorage.getItem(
        'CompanyName'
      )}&logDetails=${sessionStorage.getItem(
        'logDetails'
      )}&tdsIdVal=${sessionStorage.getItem(
        'tdsIdVal'
      )}&gstIdVal=${sessionStorage.getItem(
        'gstIdVal'
      )}&cashIdVal=${sessionStorage.getItem(
        'cashIdVal'
      )}&CustId=${sessionStorage.getItem('CustId')}`}
      target="_blank"
    >
      Accounts Dashboard
      </Link> 
    }
    else
    {
              <Link to="/ac_dashboard">Accounts Dashboard</Link>  
    }      */}
     {/*        <Link id="acdashbopard" to="/ac_dashboard">
             Accounts Dashboard
          </Link>
          document.getElementById("acdashbopard").onclick = function(evnt) {
    if (
        evnt.ctrlKey || 
        evnt.shiftKey || 
        evnt.metaKey || 
        (evnt.button && evnt.button == 1)
    ){    */}
  <Link to="/ac_dashboard">    
    <span>Accounts Dashboard</span>
                </Link>  
 {/* <Link
                    to="/ac_dashboard"
                    onClick={(e) => {
                      sessionStorage.setItem('logDetails', true);
                    }}
                  >
                    Accounts Dashboard
                  </Link> /*}
              {/* <Link
                      to={`ac_dashboard?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Accounts Dashboard
                      </Link>    */}        
            </li>
            {/*====================Accounting==========================*/}
            <li>
              <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                <span>Accounting</span>
                <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li>
                  {/* <a
                    onClick={(e) => {
                      history.push({
                        pathname: '/chart',
                      });
                    }}
                  >
                    Chart of Accounts
                  </a> */}
                   <Link to="/chart">
                    <span>Chart of Accounts</span>
                    </Link> 

                  {/* <Link
                      to={`chart?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Chart of Accounts
                      </Link> */}

                </li>
                <li className="dropdown-submenu">
                  <a href="#">Group</a>
                  <ul className="dropdown-menu">
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/add_group',
                          });
                        }}
                      > */}
                       <Link to="/add_group">
                        <span>Create Group</span>
                        </Link> 
                     { /* <Link
                      to={`add_group?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Create Group
                      </Link> */}

                      {/* </a> */}
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/view_group',
                          });
                        }}
                      >
                        View Group
                      </a> */}
                       <Link to="/view_group">
                        <span>View Group</span>
                </Link> 
                      {/* <Link
                      to={`view_group?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      View Group
                      </Link>   */}                  
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#"> Ledger/Account</a>
                  <ul className="dropdown-menu">
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/add_ledger',
                          });
                        }}
                      >
                        Create Ledger
                      </a> */}
                       <Link to="/add_ledger">
                        <span>Create Ledger</span>
                        </Link> 
                      {/* <Link
                      to={`add_ledger?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Create Ledger
                      </Link>  */}                   
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/ledger_list',
                          });
                        }}
                      >
                        View Ledger
                      </a> */}
                       <Link to="/ledger_list">
                        <span>View Ledger</span>
                        </Link> 
                      {/* <Link
                      to={`ledger_list?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      View Ledger
                      </Link>  */}                   
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Transactions</a>
                  <ul className="dropdown-menu">
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/receipt',
                          });
                        }}
                      >
                        Receipt
                      </a> */}
                       <Link to="/receipt">
                        <span>Receipt</span>
                        </Link> 
                      {/* <Link
                      to={`receipt?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Receipt
                      </Link>   */}                   
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/reciept_list',
                          });
                        }}
                      >
                        View Receipts
                      </a> */}
                       <Link to="/reciept_list">
                        <span>View Receipts</span>
                        </Link> 
                     {/* <Link
                      to={`reciept_list?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      View Receipts
                      </Link>  */}                    
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/payment',
                          });
                        }}
                      >
                        Payment
                      </a> */}
                       <Link to="/payment">
                        <span>Payment</span>
                </Link> 
                     {/* <Link
                      to={`payment?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Payment
                      </Link> */}
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/payment_list',
                          });
                        }}
                      >
                        View Voucher
                      </a> */}
                       <Link to="/payment_list">
                        <span>View Voucher</span>
                        </Link> 
                   {/*   <Link
                      to={`payment_list?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      View Voucher
                      </Link>     */}                
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/journals',
                          });
                        }}
                      >
                        Journal
                      </a> */}
                       <Link to="/journals">
                        <span>Journal</span>
                        </Link> 
                  {/*    <Link
                      to={`journals?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Journal
                      </Link> */}
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/view_journal',
                          });
                        }}
                      >
                        View Journal
                      </a> */}
                       <Link to="/view_journal">
                        <span>View Journal</span>
                        </Link> 
                 {/*     <Link
                      to={`view_journal?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      View Journal
                      </Link> */}
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/transactionHistory',
                          });
                        }}
                      >
                        Transaction History
                      </a> */}
                       <Link to="/transactionHistory">
                        <span>Transaction History</span>
                        </Link> 
                   {/*   <Link
                      to={`transactionHistory?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Transaction History
                      </Link>    */}                 
                    </li>
                  </ul>
                </li>
                <li>
                  {/* <a
                    onClick={(e) => {
                      history.push({
                        pathname: '/account_statement',
                      });
                    }}
                  >
                    Account Statements
                  </a> */}
                   <Link to="/account_statement">
                    <span>Account Statements</span>
                    </Link> 
               {/*   <Link
                      to={`account_statement?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Account Statements
                      </Link> */}
                </li>
                <li>
                  {/* <a
                    onClick={(e) => {
                      history.push({
                        pathname: '/profit_loss',
                      });
                    }}
                  >
                    Profit&amp;Loss{' '}
                  </a> */}
                   <Link to="/profit_loss">
                    <span>Profit&amp;Loss</span>
                    </Link> 
              {/*    <Link
                      to={`profit_loss?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Profit&amp;Loss
                      </Link> */}
                </li>
                <li>
                  {/* <a
                    onClick={(e) => {
                      history.push({
                        pathname: '/balance_sheet',
                      });
                    }}
                  >
                    Balancesheet
                  </a> */}
                   <Link to="/balance_sheet">
                    <span>Balancesheet</span>
                    </Link> 
               {/*   <Link
                      to={`balance_sheet?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Balance sheet
                      </Link>*/}
                </li>
                <li>
                  {/* <a
                    onClick={(e) => {
                      history.push({
                        pathname: '/trial_balance',
                      });
                    }}
                  >
                    Trial balance
                  </a> */}
                   <Link to="/trial_balance">
                    <span>Trial balance</span>
                    </Link> 
              {/*    <Link
                      to={`trial_balance?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Trial balance
                      </Link>     */}            
                </li>
                <li className="dropdown-submenu">
                  <a href="#">Reports</a>
                  <ul className="dropdown-menu">
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/cashbook',
                          });
                        }}
                      >
                        Cash Book
                      </a> */}
                      <Link to="/cashbook">
                        <span>Cash Book</span>
                        </Link> 
                    {/*  <Link
                      to={`cashbook?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Cash Book
                      </Link>*/}
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/bankbook',
                          });
                        }}
                      >
                        Bank Book
                      </a> */}
                       <Link to="/bankbook">
                        <span>Bank Book</span>
                        </Link> 
                  {/*    <Link
                      to={`bankbook?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Bank Book
                      </Link>*/}
                    </li>
                    <li>
                      {/* <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/daybook',
                          });
                        }}
                      >
                        Day Book
                      </a> */}
                       <Link to="/daybook">
                        <span>Day Book</span>
                        </Link> 
                   {/*   <Link
                      to={`daybook?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Day Book
                      </Link> */}
                    </li>
                    <li className="dropdown-submenu">
                      <a href="#">Outstanding</a>
                      <ul className="dropdown-menu">
                        <li>
                          {/* <a
                            onClick={(e) => {
                              history.push({
                                pathname: '/payable',
                              });
                            }}
                          >
                            Payables
                          </a> */}
                           <Link to="/payable">
                            <span>Payables</span>
                            </Link> 
                      {/*    <Link
                          to={`payable?CompanyName=${sessionStorage.getItem(
                            'CompanyName'
                          )}&logDetails=${sessionStorage.getItem(
                            'logDetails'
                          )}&tdsIdVal=${sessionStorage.getItem(
                            'tdsIdVal'
                          )}&gstIdVal=${sessionStorage.getItem(
                            'gstIdVal'
                          )}&cashIdVal=${sessionStorage.getItem(
                            'cashIdVal'
                          )}&CustId=${sessionStorage.getItem('CustId')}`}
                          target="_blank"
                        >
                        Payables
                          </Link>*/}
                        </li>
                        <li>
                          {/* <a
                            onClick={(e) => {
                              history.push({
                                pathname: '/recievable',
                              });
                            }}
                          >
                            Receivables
                          </a> */}
                           <Link to="/recievable">
                            <span>Receivables</span>
                            </Link> 
                        {/*  <Link
                      to={`recievable?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Receivables
                      </Link>    */}                      
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                {/* <li className="dropdown-submenu">
                  <a href="#">Invoice</a>
                  <ul className="dropdown-menu">
                    <li>
                       <a
                        onClick={(e) => {
                          history.push({
                            pathname: '/cashbook',
                          });
                        }}
                      >
                        Cash Book
                      </a> 
                      <Link to="/dashboard_invoice">Invoice Dashboard</Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </li>

            {/*====================Accounting==========================*/}

            <li>
              {/* <a
                onClick={(e) => {
                  history.push({
                    pathname: '/payment',
                  });
                }}
              >
                <span>Payment</span>
                <span className="caret" />
              </a> */}
               <Link to="/payment">
                <span>Payment</span>
                <span className="caret" />
            </Link> 
                                {/*  <Link
                      to={`payment?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Payment
                      </Link> */}
            </li>
            <li>
              {/* <a
                onClick={(e) => {
                  history.push({
                    pathname: '/receipt',
                  });
                }}
              >
                <span>Receipt</span>
                <span className="caret" />
              </a> */}
               <Link to="/receipt">
                <span>Receipt</span>
                <span className="caret" />
            </Link> 
                    {/*  <Link
                      to={`receipt?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Receipt
                      </Link>         */}   
            </li>
            <li>
              {/* <a
                onClick={(e) => {
                  history.push({
                    pathname: '/journals',
                  });
                }}
              >
                <span>Journal</span>
                <span className="caret" />
              </a> */}
               <Link to="/journals">
                <span>Journal</span>
                <span className="caret" />
            </Link> 
                  {/*     <Link
                      to={`journals?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Journal
                      </Link>          */} 
            </li>

            <li>
               <Link to="/dashboard_invoice">
                <span>Invoice Dashboard</span>
                <span className="caret" />
                      </Link> 
                 {/*       <Link
                      to={`dashboard_invoice?CompanyName=${sessionStorage.getItem(
                        'CompanyName'
                      )}&logDetails=${sessionStorage.getItem(
                        'logDetails'
                      )}&tdsIdVal=${sessionStorage.getItem(
                        'tdsIdVal'
                      )}&gstIdVal=${sessionStorage.getItem(
                        'gstIdVal'
                      )}&cashIdVal=${sessionStorage.getItem(
                        'cashIdVal'
                      )}&CustId=${sessionStorage.getItem('CustId')}`}
                      target="_blank"
                    >
                      Invoice Dashboard
                      </Link>      */}               
            </li>
          </ul>
          <div className="user">
            <div className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Settings
                <img src alt="" />
              </a>
              <ul className="dropdown-menu pull-right">
                {/*<li>
                            <a href="profile.php">Profile</a>
                        </li>
                        <li>
                            <a href="#">Account settings</a>
                        </li>*/}
                <li>
                   <Link to="migrationDate">
                    <span>Migration Date</span>
                    </Link> 
            {/*      <Link
                          to={`migrationDate?CompanyName=${sessionStorage.getItem(
                            'CompanyName'
                          )}&logDetails=${sessionStorage.getItem(
                            'logDetails'
                          )}&tdsIdVal=${sessionStorage.getItem(
                            'tdsIdVal'
                          )}&gstIdVal=${sessionStorage.getItem(
                            'gstIdVal'
                          )}&cashIdVal=${sessionStorage.getItem(
                            'cashIdVal'
                          )}&CustId=${sessionStorage.getItem('CustId')}`}
                          target="_blank"
                        >
                        Migration Date
                          </Link>     */}             
                </li>
                <li>
                   <Link to="editTemplate">
                    <span>Configure Template</span>
                    </Link> 
            {/*      <Link
                          to={`editTemplate?CompanyName=${sessionStorage.getItem(
                            'CompanyName'
                          )}&logDetails=${sessionStorage.getItem(
                            'logDetails'
                          )}&tdsIdVal=${sessionStorage.getItem(
                            'tdsIdVal'
                          )}&gstIdVal=${sessionStorage.getItem(
                            'gstIdVal'
                          )}&cashIdVal=${sessionStorage.getItem(
                            'cashIdVal'
                          )}&CustId=${sessionStorage.getItem('CustId')}`}
                          target="_blank"
                        >
                        Configure Template
                          </Link>      */}            
                </li>
                <li>
                   <Link to="createProfile">
                    <span>Create Profile</span>
                    </Link> 
             {/*     <Link
                          to={`createProfile?CompanyName=${sessionStorage.getItem(
                            'CompanyName'
                          )}&logDetails=${sessionStorage.getItem(
                            'logDetails'
                          )}&tdsIdVal=${sessionStorage.getItem(
                            'tdsIdVal'
                          )}&gstIdVal=${sessionStorage.getItem(
                            'gstIdVal'
                          )}&cashIdVal=${sessionStorage.getItem(
                            'cashIdVal'
                          )}&CustId=${sessionStorage.getItem('CustId')}`}
                          target="_blank"
                        >
                        Create Profile
                          </Link>     */}             
                </li>
                <li>
                 <Link
                    to="login"
                    onClick={(e) => {
                      sessionStorage.setItem('logDetails', false);
                    }}
                  >
                    Sign out
                  </Link>              
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  );
}

export default Headers;
