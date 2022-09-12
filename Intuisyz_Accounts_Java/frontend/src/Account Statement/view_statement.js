import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  useHistory,
  useLocation,
  Redirect,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { successToast } from '../common/global';
import baseUrl from '../Base Url/baseUrl';
import {
  grp_by_id,
  ledger_searchAc,
  list_account_statement_transaction,
  list_acTitle,
} from '../modal';
import PageLoader from '../Page Loader/pageloader';
import ReactToExcel from 'react-html-table-to-excel';
import Headers from '../Header/Headers';

const View_statement = () => {
  let history = useHistory();
  let location = useLocation();
  let url = baseUrl.url;
  const [openBalanceData, setOpenBalanceData] = useState([]);
  const [openBalanceData2, setOpenBalanceData2] = useState([]);
  const [openBalanceDataLoaded, setOpenBalanceDataLoaded] = useState(false);
  const [openBalanceDataLoaded2, setOpenBalanceDataLoaded2] = useState(false);
  const [ledgerIdData, setLedgerIdData] = useState();
  const [transactionData, setTransactionData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [startDateFlag, setStartDateFlag] = useState(false);
  const [endDateFlag, setEndDateFlag] = useState(false);
  const [flag, setFlag] = useState(0);
  // const [flag2, setFlag2] = useState(0);
  // const [loadFlag, setLoadFlag] = useState(0);
  // const [dateSearchFlag, setDateSearchFlag] = useState(0);
  const [lastBalance, setLastBalance] = useState();
  const [flag3, setFlag3] = useState(0);
  const [customFlag, setCustomFlag] = useState(false);

  const [logoImageLoaded, setLogoImageLoaded] = useState(false);
  const [templateData, setTemplateData] = useState();
  const [templateDataLoaded, setTemplateDataLoaded] = useState(false);
  const [companyAddressData, setCompanyAddressData] = useState();

  const [startDateForDisplay, setStartDateForDisplay] = useState();
  const [endDateForDisplay, setEndDateForDisplay] = useState(new Date());

  const [profileData, setProfileData] = useState();
  const [profileDataLoaded, setProfileDataLoaded] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  });
  let sDate;
  let lastBalanceVal;
console.log('line 71 startDate ',startDate,' endDate ',endDate);
  const submitFinal = handleSubmit((data) => {
    // setLoadFlag(false);
    // setOpenBalanceData2([]);
    setOpenBalanceData([
      {
        obCreated_date: openBalanceData[0].obCreated_date,
        obBalance_type: openBalanceData[0].obBalance_type,
        obOpen_balance: openBalanceData[0].obOpen_balance,
        ob: openBalanceData[0].ob,
        ledger_name: openBalanceData[0].ledger_name,
        pin: openBalanceData[0].pin,
        mobile: openBalanceData[0].mobile,
        fax: openBalanceData[0].fax,
      },
    ]);
    setOpenBalanceDataLoaded2(false);
    console.log(`line 88 openBalanceDataLoaded2 `, openBalanceDataLoaded2);
    console.log(`line 89 openBalanceData[0].obBalance_type `, openBalanceData[0].obBalance_type);

    if (startDate === null || startDate === undefined) {
      setStartDateFlag(true);
      if (endDate === null || endDate === undefined) {
        setEndDateFlag(true);
      } else {
        setEndDateFlag(false);
      }
    } else if (endDate === null || endDate === undefined) {
      setEndDateFlag(true);
      if (startDate === null || startDate === undefined) {
        setStartDateFlag(true);
      } else {
        setStartDateFlag(false);
      }
    } else {
      setStartDateFlag(false);
      setEndDateFlag(false);
      // setDateSearchFlag(true);
      // setLoadFlag(false);

      // console.log('load flag', loadFlag);

      let ledger_id = ledgerIdData;

      if (startDate.getDate() < 10) {
        var currentDay = '0' + startDate.getDate();
      } else {
        var currentDay = startDate.getDate();
      }

      if (startDate.getMonth() + 1 < 10) {
        var currentMonth = '0' + (startDate.getMonth() + 1);
      } else {
        var currentMonth = startDate.getMonth() + 1;
      }

      sDate = startDate.getFullYear() + '-' + currentMonth + '-' + currentDay;

      if (endDate.getDate() < 10) {
        var currentDay = '0' + endDate.getDate();
      } else {
        var currentDay = endDate.getDate();
      }

      if (endDate.getMonth() + 1 < 10) {
        var currentMonth = '0' + (endDate.getMonth() + 1);
      } else {
        var currentMonth = endDate.getMonth() + 1;
      }

      var eDate = endDate.getFullYear() + '-' + currentMonth + '-' + currentDay;

      console.log('sDate ',sDate, '', 'eDate ',eDate);

      setEndDateForDisplay(eDate);

      setStartDateForDisplay(sDate);

      console.log('line no 148 startDateForDisplay ',startDateForDisplay);
      console.log('line no 149 endDateForDisplay ',endDateForDisplay);      

      axios
        .get(url + `ledger_search?ledgerId=${ledger_id}`)
        .then(({ data }) => {
          console.log('line no 155 ledger_search data ',data);

          console.log('line no 154 ledger date data[0].ledger_date ', data[0].ledger_date);
          console.log('line no 155 sDate ',sDate);
          console.log('line no 156 eDate ',eDate);

          if (data[0].ledger_date <= sDate && data[0].ledger_date <= eDate) {
            setFlag(1);
            console.log('line 161 Flag ',flag);

            let cur_balance = data[0].open_balance;
            let balance_type = data[0].balance_type;
            let cur_amount = data[0].amount;
            let cur_balance1 = data[0].open_balance;
            let ob = data[0].open_balance;
            let created_date = data[0].ledger_date;
            let ledger_name = data[0].ledger_name;
            let pin = data[0].pin;
            let fax = data[0].fax;
            let mobile = data[0].mobile;
            ////////////starting calculating opening and closing balance///////////
            let debit_total = '';
            let credit_total = '';
            let description = 'ledger creation';
            console.log('line 175 data', data);
            console.log('line 176 data[0].balance_type ',data[0].balance_type);
            console.log('line 177 balance_type ',balance_type);
            axios
              .get(
                url +
                  `list_account_statement_transactionBnDates?id=${ledger_id}&description=${description}&start=${sDate}&end=${eDate}`
              )
              .then(({ data }) => {
                console.log('line 188 list_account_statement_transactionBnDates data', data);

                if (data.length > 1) {
                  console.log('debit_total', debit_total);
                  // let amount = result2[0].amount;

                  console.log(
                    'result2.dbt_ac',
                    data[0].dbt_ac,
                    'result2.crdt_ac',
                    data[0].crdt_ac,
                    'ledger_id',
                    ledger_id
                  );

                  if (data[0].dbt_ac === ledger_id) {
                    console.log('dbt');
                    if (balance_type === 'debit') {
                      cur_balance =
                        parseFloat(cur_balance) + parseFloat(data[0].amount);
                    } else if (balance_type == 'credit') {
                      cur_balance =
                        parseFloat(cur_balance) - parseFloat(data[0].amount);
                    }
                    debit_total =
                      parseFloat(debit_total) + parseFloat(data[0].amount);
                  }

                  if (data[0].crdt_ac === ledger_id) {
                    console.log('crdt');
                    if (balance_type == 'debit') {
                      cur_balance =
                        parseFloat(cur_balance) - parseFloat(data[0].amount);
                    } else if (balance_type == 'credit') {
                      cur_balance =
                        parseFloat(cur_balance) + parseFloat(data[0].amount);
                    }
                    credit_total =
                      parseFloat(credit_total) + parseFloat(data[0].amount);
                  }
                  console.log('credit_total', credit_total);
                  let balance =
                    parseFloat(debit_total) - parseFloat(credit_total);

                  // let ob = (cur_balance = result1[0].open_balance);

                  console.log('ob', ob);

                  let obArray = [];
                  obArray.push({
                    obCreated_date: created_date,
                    obBalance_type: balance_type,
                    obOpen_balance: ob,
                    ob: ob,
                    ledger_name: ledger_name,
                    pin: pin,
                    mobile: mobile,
                    fax: fax,
                  });

                  setOpenBalanceData(obArray);
                  console.log('line 243 obArray', obArray);
                  setOpenBalanceDataLoaded(true);
                  console.log('line 245 OpenBalanceData', openBalanceData);
                  console.log('line 246 obArray.obBalance_type', obArray.obBalance_type);
                  // openBalanceFun2(result1, ledger_id, result2);
                } else {
                  let obArray = [];
                  obArray.push({
                    obCreated_date: created_date,
                    obBalance_type: balance_type,
                    obOpen_balance: ob,
                    ob: ob,
                    ledger_name: ledger_name,
                    pin: pin,
                    mobile: mobile,
                    fax: fax,
                  });

                  setOpenBalanceData(obArray);
                  console.log('line 262 obArray', obArray);
                  setOpenBalanceDataLoaded(true);
                  console.log('line 264 OpenBalanceData', openBalanceData);
                  console.log('line 265 obArray.obBalance_type', obArray.obBalance_type);

                  // openBalanceFun2(result1, ledger_id, result2);
                }
              })
              .catch((err) => {
                console.log('line 267 error');
                console.log(err);
              });

            ////////////////ending calculating open and closing balance/////////////////
          } else {
            setOpenBalanceDataLoaded(true);
            setFlag(0);
          }
        })
        .catch((err) => {
          console.log('line 278 error');
          console.log(err);
        });

      /////////////////////next calculation////////////////////

      axios
        .get(
          url +
            `account_statementDataBnDates?ledgerId=${ledger_id}&start=${'2017-04-01'}&end=${eDate}&CompanyName=${sessionStorage.getItem(
              'CompanyName'
            )}&CustId=${sessionStorage.getItem('CustId')}`
        )
        .then(({ data }) => {
          console.log('line 302 account_statementDataBnDates openBalanceFun2 data', data);

          let creditTot = 0,
            debitTot = 0;

          let debitVal;
          let creditVal;
          let closingBal;

          if (data.length > 0) {
            ///////////////new code added////////////////
            debitVal = data[0].chq_no;
            creditVal = data[0].chq_date;
            closingBal = data[0].createdTime;

            let obArray1 = [];
            let obArray2 = [];

            //////////Balance upto Today code////////////

            for (let i = 0; i < data.length; i++) {
              if (data[i].tran_Date < sDate) {
                obArray2.push(data[i]);
              }
            }

            if (obArray2.length > 0) {
              console.log(
                `obArray2 Last val`,
                obArray2[obArray2.length - 1].bank
              );

              setLastBalance(obArray2[obArray2.length - 1].bank);
              lastBalanceVal = obArray2[obArray2.length - 1].bank;
            } else {
              // if (flag === 1) {
              setLastBalance(
                parseFloat(0.0) + parseFloat(openBalanceData[0].ob)
              );

              lastBalanceVal =
                parseFloat(0.0) + parseFloat(openBalanceData[0].ob);
              // }
              // setLastBalance('0.00');
            }

            console.log(`openBalanceData[0].ob`, openBalanceData[0].ob);
            console.log(`obArray2`, obArray2);
            console.log(`lastBalanceVal`, lastBalanceVal);
            //////////////////////////////////////////////

            for (let i = 0; i < data.length; i++) {
              if (data[i].tran_Date >= sDate && data[i].tran_Date <= eDate) {
                obArray1.push(data[i]);

                if (data[i].branch === 'debit') {
                  debitTot = debitTot + parseFloat(data[i].amount);
                }

                if (data[i].branch === 'credit') {
                  creditTot = creditTot + parseFloat(data[i].amount);
                }

                // if (obArray1.length > 0) {
                //   if (i === data.length - 1) {
                //     obArray1[0].createdTime = data[i].bank;
                //     console.log(' data[i].bank', data[i].bank);
                //   }
                // }
              }
            }

            if (obArray1.length > 0) {
              // setFlag2(1);
              // if (openBalanceData[0].obBalance_type === 'debit') {
              //   debitTot =
              //     debitTot + parseFloat(openBalanceData[0].obOpen_balance);
              // }
              // if (openBalanceData[0].obBalance_type === 'credit') {
              //   creditTot =
              //     creditTot + parseFloat(openBalanceData[0].obOpen_balance);
              // }

              obArray1[0].chq_no =
                parseFloat(debitTot) + parseFloat(lastBalanceVal);
              obArray1[0].chq_date = parseFloat(creditTot);
              obArray1[0].createdTime = closingBal;

              console.log('obArray1 new val', obArray1);
              setOpenBalanceData2(obArray1);
              setOpenBalanceDataLoaded2(true);
              console.log(`line 380 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

              setFlag3(1);
            } else {
              setOpenBalanceDataLoaded2(false);
              console.log(`line 385 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

              setFlag3(0);
            }

            ///////////////////////new code end////////////////////
          } else {
            // setOpenBalanceData2(data);
            // setFlag2(0);
            setOpenBalanceDataLoaded2(false);
            console.log(`line 395 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

            setFlag3(0);
          }
        })
        .catch((err) => {
          console.log('line 404 error');
          console.log(err);
        });
    }
  });

  const filterFun = async () => {
    let dateVal = localStorage.getItem('ViewStatementdateFilter');
console.log("line 422 dateVal ",dateVal);

    setOpenBalanceData([
      {
        obCreated_date: openBalanceData[0].obCreated_date,
        obBalance_type: openBalanceData[0].obBalance_type,
        obOpen_balance: openBalanceData[0].obOpen_balance,
        ob: openBalanceData[0].ob,
        ledger_name: openBalanceData[0].ledger_name,
        pin: openBalanceData[0].pin,
        mobile: openBalanceData[0].mobile,
        fax: openBalanceData[0].fax,
      },
    ]);
    setOpenBalanceDataLoaded2(false);

    console.log(`line 423 openBalanceDataLoaded2`, openBalanceDataLoaded2);
    console.log(`line 424 openBalanceData[0].obBalance_type`, openBalanceData[0].obBalance_type);
    console.log(`line 439 ledgerIdData `,ledgerIdData);

    let ledger_id = ledgerIdData;

    var startdate = new Date();
    var enddate = new Date();

    console.log('line 447 startdate ', startdate,' enddate ', enddate);
    console.log('line 448 dateVal ',dateVal);  

    if (dateVal === '0') {
      // This month
      startdate.setDate(1);
      console.log('line 451 startdate ',startdate,' enddate ',enddate);
    }

    if (dateVal === '1') {
      // Last Month
      startdate.setDate(1);
      var today = new Date();
      let mnth = today.getMonth() - 1;
      startdate.setMonth(mnth);
      enddate.setMonth(mnth);
      if (today.getMonth() === '0') {
        // If this month is Jan
        startdate.setFullYear(today.getFullYear() - 1);
        enddate.setFullYear(today.getFullYear() - 1);
      } else {
        startdate.setFullYear(today.getFullYear());
        enddate.setFullYear(today.getFullYear());
      }
      if (mnth === 0 || mnth === 2 || mnth === 4 || mnth === 6 || mnth === 7 || mnth === 9 || mnth === 11)
      {
        // Jan Mar May Jul Aug Oct Dec
        enddate.setDate(31);
      }
      if (mnth === 3 || mnth === 5 || mnth === 7 || mnth === 10)
      {
        // Apr Jun Sep Nov
        enddate.setDate(30);
      }
      if (mnth ===1) // February
      {
        var yr = startdate.getFullYear();
        if((yr%4 === 0) && ((yr%400 === 0) || (yr%100 !== 0)))
        {
          // Leap Year
          enddate.setDate(29);
        }
        else
        {
          // Not a Leap Year
          enddate.setDate(28);
        }    
        //enddate.setDate(28);
        //enddate.setDate(29);
      }
      console.log('line 487 startdate ',startdate,' enddate ',enddate);
    }

    if (dateVal === '2') {
      // This Financial Year
      startdate.setMonth(3);
      startdate.setDate(1);

      enddate.setMonth(2);
      enddate.setDate(31);

      var today = new Date();

      if (today.getMonth() + 1 <= 3) {
        startdate.setFullYear(today.getFullYear() - 1);
        enddate.setFullYear(today.getFullYear());
      } else {
        startdate.setFullYear(today.getFullYear());

        enddate.setFullYear(today.getFullYear() + 1);
      }
      console.log('line 508 startdate ',startdate,' enddate ',enddate);
    }

    if (dateVal === '3') {
      // Last Financial Year
      startdate.setMonth(3);
      startdate.setDate(1);

      enddate.setMonth(2);
      enddate.setDate(31);

      var today = new Date();

      if (today.getMonth() + 1 <= 3) {
        startdate.setFullYear(today.getFullYear() - 2);
        enddate.setFullYear(today.getFullYear() - 1);
      } else {
        startdate.setFullYear(today.getFullYear() - 1);

        enddate.setFullYear(today.getFullYear());
      }
      console.log('line 529 startdate ',startdate,' enddate ',enddate);
    }

    if (dateVal === '5')
    {
      let startdate = new Date();
      var enddate = new Date();
      startdate.setMonth(3);
      startdate.setDate(1);
      if (enddate.getMonth() === '0') {
        // If this month is Jan
        startdate.setFullYear(enddate.getFullYear() - 1);
      } else {
        startdate.setFullYear(enddate.getFullYear());
      }
      console.log('line 546 enddate ',enddate,' startdate ',startdate);
    }

    // let ledger_id = ledgerIdData;

    if (startdate.getDate() < 10) {
      var currentDay = '0' + startdate.getDate();
    } else {
      var currentDay = startdate.getDate();
    }

    if (startdate.getMonth() + 1 < 10) {
      var currentMonth = '0' + (startdate.getMonth() + 1);
    } else {
      var currentMonth = startdate.getMonth() + 1;
    }

    var sDate = startdate.getFullYear() + '-' + currentMonth + '-' + currentDay;

    if (enddate.getDate() < 10) {
      var currentDay = '0' + enddate.getDate();
    } else {
      var currentDay = enddate.getDate();
    }

    if (enddate.getMonth() + 1 < 10) {
      var currentMonth = '0' + (enddate.getMonth() + 1);
    } else {
      var currentMonth = enddate.getMonth() + 1;
    }

    var eDate = enddate.getFullYear() + '-' + currentMonth + '-' + currentDay;
  
    console.log('sDate ',sDate, ' eDate ', eDate);

    setEndDateForDisplay(eDate);
    setStartDateForDisplay(sDate);

      console.log('line no 521 startDateForDisplay ',startDateForDisplay);
      console.log('line no 522 endDateForDisplay ',endDateForDisplay);

    axios
      .get(url + `ledger_search?ledgerId=${ledger_id}`)
      .then(({ data }) => {
        console.log('line no 538 data[0].ledger_date ', data[0].ledger_date);
        console.log('line no 539 sDate ',sDate);
        console.log('line no 540 eDate ',eDate);
        if (data[0].ledger_date <= sDate && data[0].ledger_date <= eDate) {
          setFlag(1);
          console.log('line 544 Flag ',flag);

          let cur_balance = data[0].open_balance;
          let balance_type = data[0].balance_type;
          let cur_amount = data[0].amount;
          let cur_balance1 = data[0].open_balance;
          let ob = data[0].open_balance;
          let created_date = data[0].ledger_date;
          let ledger_name = data[0].ledger_name;
          let pin = data[0].pin;
          let fax = data[0].fax;
          let mobile = data[0].mobile;
          ////////////starting calculating opening and closing balance///////////
          let debit_total = '';
          let credit_total = '';
          let description = 'ledger creation';
          console.log('line 556 data', data);
          console.log('line 557 data[0].balance_type ',data[0].balance_type);
          console.log('line 558 balance_type ',balance_type);
          axios
            .get(
              url +
                `list_account_statement_transactionBnDates?id=${ledger_id}&description=${description}&start=${sDate}&end=${eDate}`
            )
            .then(({ data }) => {
              console.log('data', data);

              if (data.length > 1) {
                console.log('debit_total', debit_total);
                // let amount = result2[0].amount;

                console.log(
                  'result2.dbt_ac',
                  data[0].dbt_ac,
                  'result2.crdt_ac',
                  data[0].crdt_ac,
                  'ledger_id',
                  ledger_id
                );

                if (data[0].dbt_ac === ledger_id) {
                  console.log('dbt');
                  if (balance_type === 'debit') {
                    cur_balance =
                      parseFloat(cur_balance) + parseFloat(data[0].amount);
                  } else if (balance_type == 'credit') {
                    cur_balance =
                      parseFloat(cur_balance) - parseFloat(data[0].amount);
                  }
                  debit_total =
                    parseFloat(debit_total) + parseFloat(data[0].amount);
                }

                if (data[0].crdt_ac === ledger_id) {
                  console.log('crdt');
                  if (balance_type == 'debit') {
                    cur_balance =
                      parseFloat(cur_balance) - parseFloat(data[0].amount);
                  } else if (balance_type == 'credit') {
                    cur_balance =
                      parseFloat(cur_balance) + parseFloat(data[0].amount);
                  }
                  credit_total =
                    parseFloat(credit_total) + parseFloat(data[0].amount);
                }
                console.log('credit_total', credit_total);
                let balance =
                  parseFloat(debit_total) - parseFloat(credit_total);

                // let ob = (cur_balance = result1[0].open_balance);

                console.log('ob', ob);

                let obArray = [];
                obArray.push({
                  obCreated_date: created_date,
                  obBalance_type: balance_type,
                  obOpen_balance: ob,
                  ob: ob,
                  ledger_name: ledger_name,
                  pin: pin,
                  mobile: mobile,
                  fax: fax,
                });

                setOpenBalanceData(obArray);
                console.log('line 622 obArray', obArray);
                setOpenBalanceDataLoaded(true);
                console.log('line 624 OpenBalanceData', openBalanceData);
                console.log('line 625 obArray.obBalance_type', obArray.obBalance_type);

                // openBalanceFun2(result1, ledger_id, result2);
              } else {
                let obArray = [];
                obArray.push({
                  obCreated_date: created_date,
                  obBalance_type: balance_type,
                  obOpen_balance: ob,
                  ob: ob,
                  ledger_name: ledger_name,
                  pin: pin,
                  mobile: mobile,
                  fax: fax,
                });

                setOpenBalanceData(obArray);
                console.log('line 642 obArray', obArray);
                setOpenBalanceDataLoaded(true);
                console.log('line 644 OpenBalanceData', openBalanceData);
                console.log('line 645 obArray.obBalance_type', obArray.obBalance_type);

                // openBalanceFun2(result1, ledger_id, result2);
              }
            })
            .catch((err) => {
              console.log('line 649 error');
              console.log(err);
            });

          ////////////////ending calculating open and closing balance/////////////////
        } else {
          setOpenBalanceDataLoaded(true);
          setFlag(0);
        }
      })
      .catch((err) => {
        console.log('line 660 error');
        console.log(err);
      });

    /////////////////////next calculation////////////////////

    axios
      .get(
        url +
          `account_statementDataBnDates?ledgerId=${ledger_id}&start=${'2017-04-01'}&end=${eDate}&CompanyName=${sessionStorage.getItem(
            'CompanyName'
          )}&CustId=${sessionStorage.getItem('CustId')}`
      )
      .then(({ data }) => {
        console.log('line 686 account_statementDataBnDates openBalanceFun2 data', data);

        let creditTot = 0,
          debitTot = 0;

        let debitVal;
        let creditVal;
        let closingBal;
        console.log('line 694 data.length ',data.length);

        if (data.length > 0) {
          ///////////////new code added////////////////
          debitVal = data[0].chq_no;
          creditVal = data[0].chq_date;
          closingBal = data[0].createdTime;

          let obArray1 = [];
          let obArray2 = [];

          //////////Balance upto Today code////////////

          for (let i = 0; i < data.length; i++) {
            if (data[i].tran_Date < sDate) {
              obArray2.push(data[i]);
            }
          }
          console.log('line 711 obArray2.length ',obArray2.length);

          if (obArray2.length > 0) {
            console.log(`obArray2 Last val`,obArray2[obArray2.length - 1].bank);

            setLastBalance(obArray2[obArray2.length - 1].bank);
            lastBalanceVal = obArray2[obArray2.length - 1].bank;
          } else {
            // if (flag === 1) {
            setLastBalance(parseFloat(0.0) + parseFloat(openBalanceData[0].ob));

            lastBalanceVal =
              parseFloat(0.0) + parseFloat(openBalanceData[0].ob);
            // }
            // setLastBalance('0.00');
          }

          //////////////////////////////////////////////
          console.log('line 731 data.length ',data.length);
          console.log('line 732 sDate ',sDate);
          console.log('line 733 eDate ',eDate);

          for (let i = 0; i < data.length; i++) {
            if (data[i].tran_Date >= sDate && data[i].tran_Date <= eDate) {
              obArray1.push(data[i]);
              console.log('line 738 data[i].tran_Date ',data[i].tran_Date);
              console.log('line 739 obArray1[i] ',obArray1[i]);

              if (data[i].branch === 'debit') {
                debitTot = debitTot + parseFloat(data[i].amount);
              }

              if (data[i].branch === 'credit') {
                creditTot = creditTot + parseFloat(data[i].amount);
              }

              // if (data[i].branch === 'debit') {
              //   debitTot = debitTot + parseFloat(data[i].amount);
              // }

              // if (data[i].branch === 'credit') {
              //   creditTot = creditTot + parseFloat(data[i].amount);
              // }

              // if (obArray1.length > 0) {
              //   if (i === data.length - 1) {
              //     obArray1[0].createdTime = data[i].bank;
              //     console.log(' data[i].bank', data[i].bank);
              //   }
              // }
            }
          }

          if (obArray1.length > 0) {
            // if (openBalanceData[0].obBalance_type === 'debit') {
            //   debitTot =
            //     debitTot + parseFloat(openBalanceData[0].obOpen_balance);
            // }
            // if (openBalanceData[0].obBalance_type === 'credit') {
            //   creditTot =
            //     creditTot + parseFloat(openBalanceData[0].obOpen_balance);
            // }

            // obArray1[0].chq_no = debitVal;
            // obArray1[0].chq_date = creditVal;
            // obArray1[0].createdTime = closingBal;

            obArray1[0].chq_no =
              parseFloat(debitTot) + parseFloat(lastBalanceVal);
            obArray1[0].chq_date = parseFloat(creditTot);
            obArray1[0].createdTime = closingBal;

            console.log('obArray1 new val', obArray1);
            setOpenBalanceData2(obArray1);
            setOpenBalanceDataLoaded2(true);
            console.log(`line 765 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

            setFlag3(1);

            // console.log('obArray1 new val', obArray1);
            // setOpenBalanceData2(obArray1);
            // setOpenBalanceDataLoaded2(true);
          } else {
            setOpenBalanceDataLoaded2(false);
            console.log(`line 774 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

            setFlag3(0);
          }

          ///////////////////////new code end////////////////////
        } else {
          // setOpenBalanceData2(data);
          setOpenBalanceDataLoaded2(false);
          console.log(`line 783 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

          setFlag3(0);
        }
      })
      .catch((err) => {
        console.log('line 795 error');
        console.log(err);
      });
  };

  function openBalanceFun(ledger_id) {
    axios
      .get(url + `ledger_search?ledgerId=${ledger_id}`)
      .then(({ data }) => {
        setFlag(1);

        console.log('line 821 openBalanceFun data ',data, ' data.length ',data.length);

        let cur_balance = data[0].open_balance;
        let balance_type = data[0].balance_type;
        let cur_amount = data[0].amount;
        let cur_balance1 = data[0].open_balance;
        let ob = data[0].open_balance;
        let created_date = data[0].ledger_date;
        let ledger_name = data[0].ledger_name;
        let pin = data[0].pin;
        let fax = data[0].fax;
        let mobile = data[0].mobile;
        ////////////starting calculating opening and closing balance///////////
        let debit_total = '';
        let credit_total = '';
        let description = 'ledger creation';

        console.log('line 826 data', data, ' data.length ',data.length);
        console.log('line 827 data[0].balance_type ',data[0].balance_type);
        console.log('line 828 balance_type ',balance_type);

        if (data[0].open_balance === '' || data[0].open_balance === undefined || data[0].open_balance === null) {
          ob = 0;
        }

        axios
          .get(
            url +
              `list_account_statement_transaction?id=${ledger_id}&description=${description}&CompanyName=${sessionStorage.getItem(
                'CompanyName'
              )}&CustId=${sessionStorage.getItem('CustId')}`
          )
          .then(({ data }) => {
            console.log('line 855 list_account_statement_transaction data', data, ' data.length ',data.length);

            if (data.length > 1) {
              console.log('line 858 debit_total', debit_total);
              // let amount = result2[0].amount;

              console.log('line 861 result2.dbt_ac ',data[0].dbt_ac,' result2.crdt_ac ',data[0].crdt_ac,' ledger_id ',ledger_id);

              if (data[0].dbt_ac === ledger_id) {
                console.log('dbt');
                if (balance_type === 'debit') {
                  cur_balance =
                    parseFloat(cur_balance) + parseFloat(data[0].amount);
                } else if (balance_type == 'credit') {
                  cur_balance =
                    parseFloat(cur_balance) - parseFloat(data[0].amount);
                }
                debit_total =
                  parseFloat(debit_total) + parseFloat(data[0].amount);
              }

              if (data[0].crdt_ac === ledger_id) {
                console.log('crdt');
                if (balance_type == 'debit') {
                  cur_balance =
                    parseFloat(cur_balance) - parseFloat(data[0].amount);
                } else if (balance_type == 'credit') {
                  cur_balance =
                    parseFloat(cur_balance) + parseFloat(data[0].amount);
                }
                credit_total =
                  parseFloat(credit_total) + parseFloat(data[0].amount);
              }
              console.log('credit_total', credit_total);
              let balance = parseFloat(debit_total) - parseFloat(credit_total);

              // let ob = (cur_balance = result1[0].open_balance);

              console.log('ob', ob);
              console.log('line 891 balance_type ',balance_type);

              let obArray = [];
              obArray.push({
                obCreated_date: created_date,
                obBalance_type: balance_type,
                obOpen_balance: ob,
                ob: ob,
                ledger_name: ledger_name,
                pin: pin,
                mobile: mobile,
                fax: fax,
              });

              setOpenBalanceData(obArray);
              console.log('line 906 obArray', obArray);
              console.log('line 907 openBalanceData', openBalanceData);
              console.log('line 908 obArray[0].obBalance_type', obArray[0].obBalance_type);
              setOpenBalanceDataLoaded(true);

              // openBalanceFun2(result1, ledger_id, result2);
            } else {
              let obArray = [];
              obArray.push({
                obCreated_date: created_date,
                obBalance_type: balance_type,
                obOpen_balance: ob,
                ob: ob,
                ledger_name: ledger_name,
                pin: pin,
                mobile: mobile,
                fax: fax,
              });

              setOpenBalanceData(obArray);
              console.log('line 919 obArray', obArray);
              setOpenBalanceDataLoaded(true);
              console.log('line 921 OpenBalanceData', openBalanceData);
              console.log('line 922 obArray.obBalance_type', obArray.obBalance_type);

              // openBalanceFun2(result1, ledger_id, result2);
            }
          })
          .catch((err) => {
            console.log('line 922 error');
            console.log(err);
          });

        ////////////////ending calculating open and closing balance/////////////////
      })
      .catch((err) => {
        console.log('line 929 error');
        console.log(err);
      });
  }

  function openBalanceFun2(ledger_id) {
    axios
      .get(url + `account_statementData?ledgerId=${ledger_id}`)
      .then(({ data }) => {
        console.log('line 954 openBalanceFun2 account_statementData data', data,' data.length ',data.length);

        if (data.length > 0) {
          if (endDateForDisplay.getDate() < 10) {
            var currentDay = '0' + endDateForDisplay.getDate();
          } else {
            var currentDay = endDateForDisplay.getDate();
          }

          if (endDateForDisplay.getMonth() + 1 < 10) {
            var currentMonth = '0' + (endDateForDisplay.getMonth() + 1);
          } else {
            var currentMonth = endDateForDisplay.getMonth() + 1;
          }

          let eDate =
            endDateForDisplay.getFullYear() +
            '-' +
            currentMonth +
            '-' +
            currentDay;

          setEndDateForDisplay(eDate);

          setStartDateForDisplay(data[0].tran_Date);

          setOpenBalanceData2(data);
          setOpenBalanceDataLoaded2(true);
          console.log(`line 957 openBalanceDataLoaded2 `, openBalanceDataLoaded2);

        }
      })
      .catch((err) => {
        console.log('line 971 error');
        console.log(err);
      });
  }

  useEffect(() => {
    
    console.log('history.length ',history.length);
    
    if (history.length === 1) // new tab
    {
      sessionStorage.setItem('logDetails',localStorage.getItem('logDetails'));
      sessionStorage.setItem('CompanyName',localStorage.getItem('CompanyName'));
      sessionStorage.setItem('tdsIdVal',localStorage.getItem('tdsIdVal'));
      sessionStorage.setItem('gstIdVal',localStorage.getItem('gstIdVal'));
      sessionStorage.setItem('cashIdVal',localStorage.getItem('cashIdVal'));
      sessionStorage.setItem('CustId',localStorage.getItem('CustId'));
    }
    console.log(`sessionStorage.getItem('logDetails') `,sessionStorage.getItem('logDetails'));
    console.log(`sessionStorage.getItem('CompanyName') `,sessionStorage.getItem('CompanyName'));
    console.log(`sessionStorage.getItem('tdsIdVal') `,sessionStorage.getItem('tdsIdVal'));
    console.log(`sessionStorage.getItem('gstIdVal') `,sessionStorage.getItem('gstIdVal'));
    console.log(`sessionStorage.getItem('cashIdVal') `,sessionStorage.getItem('cashIdVal'));
    console.log(`sessionStorage.getItem('CustId') `,sessionStorage.getItem('CustId'));

    if (sessionStorage.getItem('logDetails') === 'true') {
      let mgrDate = localStorage.getItem('migrationDate');

      if (mgrDate !== null && mgrDate !== undefined && mgrDate !== '') {
        let k = mgrDate;
        console.log(k.split('-'));
        let i = new Date(k.split('-')[0], k.split('-')[1] - 1, k.split('-')[2]);
        console.log('i ',i);
        setStartDate(i);
      }
      if (location.post === undefined || location.post === null) {
        let ledger_id = localStorage.getItem('AccStmtLedger_id');

        if (ledger_id === null || ledger_id === undefined) {
          history.push({
            pathname: '/account_statement',
          });
        } else {
          console.log('line 1011 ledger_id ',ledger_id,' ledgerIdData ',ledgerIdData);
          openBalanceFun(ledger_id);

          openBalanceFun2(ledger_id);
          setLedgerIdData(ledger_id);
          // setLoadFlag(1);
          // setDateSearchFlag(0);
          console.log('line 1018 ledger_id ',ledger_id,' ledgerIdData ',ledgerIdData);

          axios
            .get(
              url +
                `templateData?CompanyName=${sessionStorage.getItem(
                  'CompanyName'
                )}&CustId=${sessionStorage.getItem('CustId')}`
            )
            .then(({ data }) => {
              console.log('line 1026 data', data,' data.length ',data.length);

              let max_size = 41;
              let totSplit = parseInt(
                data[0].template_companyAddress.length / max_size
              );
              let start = 0,
                last = max_size;
              let str = [];

              console.log('totSplit', totSplit);

              for (let i = 1; i <= totSplit; i++) {
                str[i] = data[0].template_companyAddress.slice(start, last);

                start = last;
                last = max_size * (i + 1);
              }

              // let str_1 = data[0].template_companyAddress.slice(0, max_size);
              // let str_2 = data[0].template_companyAddress.slice(
              //   max_size,
              //   max_size * 2
              // );

              // let companyAddress = {};

              // companyAddress.str_1 = str_1;
              // companyAddress.str_2 = str_2;

              console.log('companyAddress', str);
              setCompanyAddressData(str);

              setTemplateData(data);

              setTemplateDataLoaded(true);
              console.log('template data', data);

              let logoName = data[0].template_logo;
              let signName = data[0].template_sig;

              axios
                .get(url + `invoiceImgFetch?fileName=${data[0].template_logo}`)
                .then(({ data }) => {
                  console.log('line 1070 img fetch data', data,' data.length ',data.length);

                  setLogoImageLoaded(true);

                  var image = document.getElementById('logoImg');
                  // the result image data
                  image.src = url + `invoiceImgFetch?fileName=${logoName}`;

                  var image1 = document.getElementById('logoImg1');
                  // the result image data
                  image1.src = url + `invoiceImgFetch?fileName=${logoName}`;
                })
                .catch((err) => {
                  console.log('line 1064 error');
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log('line 1069 error');
              console.log(err);
            });

          axios
            .get(
              url +
                `profileData?CompanyName=${sessionStorage.getItem(
                  'CompanyName'
                )}&CustId=${sessionStorage.getItem('CustId')}`
            )
            .then(({ data }) => {
              console.log('line 1100 profile data', data,' data.length ',data.length);

              setProfileData(data);

              setProfileDataLoaded(true);
            })
            .catch((err) => {
              console.log('line 1087 error');
              console.log(err);
            });
        }
      } else {
        console.log('line 1112 location.post.id', location.post);

        let ledger_id = location.post;
        openBalanceFun(ledger_id);

        openBalanceFun2(ledger_id);
        setLedgerIdData(ledger_id);
        // setLoadFlag(1);
        // setDateSearchFlag(0);

        axios
          .get(
            url +
              `templateData?CompanyName=${sessionStorage.getItem(
                'CompanyName'
              )}&CustId=${sessionStorage.getItem('CustId')}`
          )
          .then(({ data }) => {
            console.log('line 1130 template data', data,' data.length ',data.length);

            let max_size = 41;
            let totSplit = parseInt(
              data[0].template_companyAddress.length / max_size
            );
            let start = 0,
              last = max_size;
            let str = [];

            console.log('totSplit', totSplit);

            for (let i = 1; i <= totSplit; i++) {
              str[i] = data[0].template_companyAddress.slice(start, last);

              start = last;
              last = max_size * (i + 1);
            }

            console.log('companyAddress', str);
            setCompanyAddressData(str);

            console.log('template data', data);
            setTemplateData(data);

            setTemplateDataLoaded(true);

            let logoName = data[0].template_logo;
            let signName = data[0].template_sig;

            axios
              .get(url + `invoiceImgFetch?fileName=${data[0].template_logo}`)
              .then(({ data }) => {
                console.log('line 1163 img fetch data', data);
                setLogoImageLoaded(true);

                var image = document.getElementById('logoImg');
                // the result image data
                image.src = url + `invoiceImgFetch?fileName=${logoName}`;

                var image1 = document.getElementById('logoImg1');
                // the result image data
                image1.src = url + `invoiceImgFetch?fileName=${logoName}`;
              })
              .catch((err) => {
                console.log('line 1153 error');
                console.log(err);
              });
          })
          .catch((err) => {
            console.log('line 1158 error');
            console.log(err);
          });

        axios
          .get(
            url +
              `profileData?CompanyName=${sessionStorage.getItem(
                'CompanyName'
              )}&CustId=${sessionStorage.getItem('CustId')}`
          )
          .then(({ data }) => {
            console.log('profile data', data);
            setProfileData(data);

            setProfileDataLoaded(true);
          })
          .catch((err) => {
            console.log('line 1176 error');
            console.log(err);
          });
      }
    } else {
      history.push({
        pathname: '/login',
      });
    }
  }, []);

  function addCommas(nStr) {
    // nStr += '';
    // var x = nStr.split('.');
    // var x1 = x[0];
    // var x2 = x.length > 1 ? '.' + x[1] : '.00';
    // var rgx = /(\d+)(\d{3})/;
    // while (rgx.test(x1)) {
    //   x1 = x1.replace(rgx, '$1' + ',' + '$2');
    // }

    // if (x2.length === 2) {
    //   x2 = x2 + '0';
    // }
    // return x1 + x2;
    return format(parseFloat(nStr));
  }

  const format = (num, decimals) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  function prints(el) {
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById('id2').innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
    window.location.reload();
  }

  function dateReset() {
    window.location.reload();
  }

  return (
    <div>
      <Headers />
      {openBalanceDataLoaded && templateDataLoaded ? (
        <div className="container-fluid" id="content">
          <div id="main" style={{ marginLeft: '50px', marginRight: '50px' }}>
            <div className="container-fluid">
              <div className="page-header">
                <div className="pull-left">
                  <h1>Account Statement</h1>
                </div>
              </div>
              <br />
              <div className="row" style={{ paddingLeft: '40px' }}>
                <div className="col-sm-12">
                  <form className="form-horizontal" method="post">
                    <div className="row">
                      <div className="col-sm-2 form-group">
                        <select
                          id="srch_by_mnths"
                          className="form-control"
                          name="srch_by_mnths"
                          onChange={(e) => {
                            if (e.target.value === '4') {
                              setCustomFlag(true);
                            } else {
                              setCustomFlag(false);

                              localStorage.setItem(
                                'ViewStatementdateFilter',
                                e.target.value
                              );
                              {console.log("e.target.value ",e.target.value)}

                              filterFun(e.target.value);
                            }
                          }}
                        >
                          <option value={5}> -- select time slot -- </option>
                          <option value={0}>This month</option>
                          <option value={1}>Last month</option>
                          <option value={2}>This Financial Year</option>
                          <option value={3}>Last Financial Year</option>
                          <option value={4}>Custom</option>
                        </select>
                      </div>
                      {customFlag && (
                        <>
                          <div className="col-sm-4 form-group">
                            <label
                              htmlFor="textfield"
                              className="control-label col-sm-2"
                            >
                              Start Date
                            </label>
                            <div className="col-sm-9">
                              <DatePicker
                                name="start"
                                className="form-control datepicker"
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                defaultValue=""
                              />
                              <div style={{ color: 'red' }}>
                                {startDateFlag && <p>Date is required.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4 form-group">
                            <label
                              htmlFor="textfield"
                              className="control-label col-sm-2"
                            >
                              End Date
                            </label>
                            <div className="col-sm-9">
                              <DatePicker
                                name="end"
                                className="form-control datepicker"
                                dateFormat="dd/MM/yyyy"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                defaultValue=""
                              />
                              <div style={{ color: 'red' }}>
                                {endDateFlag && <p>Date is required.</p>}
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-2">
                            <input
                              type="submit"
                              name="submit"
                              className="btn btn-primary btn-lg"
                              onClick={(e) => {
                                e.preventDefault();
                                submitFinal();
                              }}
                              defaultValue="Search"
                            />
                            &nbsp;
                            <input
                              type="button"
                              name="reset"
                              className="btn btn-light btn-lg"
                              onClick={(e) => {
                                e.preventDefault();
                                dateReset();
                              }}
                              defaultValue="Reset"
                            />
                          </div>
                        </>
                      )}

                      {/* <div className="col-sm-4 form-group">
                      <label
                        htmlFor="textfield"
                        className="control-label col-sm-2"
                      >
                        Start Date
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          name="start"
                          className="form-control datepicker"
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          defaultValue=""
                        />
                        <div style={{ color: 'red' }}>
                          {startDateFlag && <p>Date is required.</p>}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 form-group">
                      <label
                        htmlFor="textfield"
                        className="control-label col-sm-2"
                      >
                        End Date
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          className="form-control"
                          name="end"
                          className="form-control datepicker"
                          dateFormat="dd/MM/yyyy"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          defaultValue=""
                        />
                        <div style={{ color: 'red' }}>
                          {endDateFlag && <p>Date is required.</p>}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 form-group">
                      <div className="col-sm-5">
                        <select
                          id="srch_by_mnths"
                          className="form-control"
                          name="srch_by_mnths"
                          onChange={(e) => {
                            localStorage.setItem(
                              'ViewStatementdateFilter',
                              e.target.value
                            );

                            filterFun(e.target.value);
                          }}
                        >
                          <option value=""> -- select time slot -- </option>
                          <option value={0}>This month</option>
                          <option value={1}>Last month</option>
                          <option value={2}>This Financial Year</option>
                          <option value={3}>Last Financial Year</option>
                        </select>
                      </div>
                      <div
                        className="col-sm-2"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <input
                          type="submit"
                          name="submit"
                          className="btn btn-primary btn-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            submitFinal();
                          }}
                          defaultValue="Search"
                        />
                        &nbsp;
                        <input
                          type="button"
                          name="reset"
                          className="btn btn-light btn-lg"
                          onClick={(e) => {
                            e.preventDefault();
                            dateReset();
                          }}
                          defaultValue="Reset"
                        />
                      </div>
                    </div> */}
                    </div>
                  </form>
                </div>
              </div>
              {/*-form ends here-*/}
              <div className="row" style={{ paddingLeft: '22px' }}>
                <div className="col-sm-11">
                  <div align="right">
                    <form method="post"></form>
                  </div>
                  <div className="box box-color box-bordered">
                    <div className="box-title"></div>
                    <div className="box-content nopadding">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          margin: '50px',
                        }}
                      >
                        <div>
                          {logoImageLoaded === false ? (
                            <div
                              style={{
                                width: '250px',
                                height: '250px',
                                paddingLeft: 150,
                                paddingTop: 50,
                              }}
                            ></div>
                          ) : (
                            <div>
                              <img
                                //src={'/assets/images/' + logo}
                                alt="Loading..."
                                id="logoImg"
                              />
                            </div>
                          )}
                        </div>
                        <div align="right">
                          <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                            {profileData[0].organization_name}
                          </label>
                          <br></br>
                          {companyAddressData.map((item, index) => {
                            return (
                              <>
                                <label
                                  style={{ fontWeight: 'normal', fontSize: 14 }}
                                >
                                  {item}

                                  {/* KOLENCHERY TOWER THIRD FLOOR <br></br>NEAR LITTLE
                            FLOWER HOSPITAL */}
                                </label>
                                <br></br>
                              </>
                            );
                          })}

                          <label style={{ fontWeight: 'normal', fontSize: 14 }}>
                            GSTIN {profileDataLoaded && profileData[0].gst_id}
                          </label>
                          <br></br>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          margin: '0px 50px 50px',
                        }}
                      >
                        <div></div>
                        <div>
                          <label style={{ fontWeight: 'bold', fontSize: 25 }}>
                            Statement of Accounts
                          </label>
                          <hr
                            style={{
                              borderTop: '2px solid black',
                              marginTop: '-5px',
                            }}
                          ></hr>
                          <div
                            style={{
                              marginTop: '-18px',
                              textAlign: 'right',
                            }}
                          >
                            <label>
                              {console.log('line 1515 openBalanceDataLoaded2 ',openBalanceDataLoaded2)}
                              {console.log('line 1516 startDateForDisplay ',startDateForDisplay)}
                                {console.log('line 1517 endDateForDisplay ',endDateForDisplay)}                              
                              {startDateForDisplay + ' To '}
                              {endDateForDisplay}
                            </label>
                          </div>
                          <hr
                            style={{
                              borderTop: '2px solid black',
                              marginTop: '-3px',
                            }}
                          ></hr>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          margin: '-50px 50px 40px',
                        }}
                      >
                        <div align="left">
                          <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                            To
                          </label>
                          <br></br>
                          <label style={{ fontWeight: 'bold', fontSize: 15 }}>
                            {openBalanceData[0].ledger_name}
                          </label>
                          <br></br>
                          <label>
                            {' '}
                            {/* GSTIN {profileDataLoaded && profileData[0].gst_id} */}
                          </label>
                        </div>
                        <div>
                          <label
                            style={{
                              backgroundColor: '#e6e6e6',
                              padding: '5px 200px 5px 10px',
                            }}
                          >
                            Account Summary
                          </label>
                          <br></br>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              margin: 5,
                            }}
                          >
                            <label>Opening Balance</label>
                            <label>
                              {flag === 1 &&
                                ('₹' + openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}

                              {/*{flag3 === 1 && addCommas(lastBalance)}*/}
                            </label>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              margin: 5,
                            }}
                          >
                            {/* <label>Invoiced Amount</label>
                            <label>₹ 0.00</label> */}
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              margin: 5,
                            }}
                          >
                            {/* <label>Amount Received</label>
                            <label>₹ 0.00</label> */}
                          </div>
                          <div style={{ marginTop: '-20px' }}>
                            <hr style={{ borderTop: '2px solid black' }}></hr>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: '-10px',
                            }}
                          >
                            <label>Balance Due</label>
                            <label>
                              {openBalanceDataLoaded2
                                ? openBalanceDataLoaded2
                                  ? openBalanceData2[0].createdTime > 0 &&
                                    addCommas(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'debit'
                                ? addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}
                                
                              {openBalanceDataLoaded2 &&
                                openBalanceData2[0].createdTime < 0 &&
                                addCommas(
                                  Math.abs(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                )}
                            </label>
                          </div>
                        </div>
                      </div>
                      <table className="table table-hover table-nomargin table-striped table-bordered dataTable dataTable-colvis">
                        <thead>
                          <tr style={{ backgroundColor: 'black' }}>
                            <th width={150}>Date</th>
                            <th width={150}>Particulars</th>
                            <th width={150}>Narration</th>
                            <th width={150}>Debit</th>
                            <th width={150}>Credit</th>
                            <th width={150}>Balance</th>
                            <th width={150}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {console.log('flag ',flag)}
                          {flag === 1 && (
                            <>
                              <tr>
                                <td>{openBalanceData[0].obCreated_date}</td>
                                <td>Opening balance</td>
                                <td />
                                <td align="right">
                                  {openBalanceData[0].obBalance_type ===
                                    'debit' &&
                                    (openBalanceData[0].obOpen_balance === ''
                                      ? 0.0
                                      : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}
                                </td>
                                <td align="right">
                                  {openBalanceData[0].obBalance_type ===
                                    'credit' &&
                                    (openBalanceData[0].obOpen_balance === ''
                                      ? 0.0
                                      : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}
                                </td>
                                <td align="right">
                                  {openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))}
                                </td>
                                <td />
                              </tr>
                            </>
                          )}

                          {flag3 === 1 && (
                            <>
                              <tr>
                                <td>{sDate}</td>
                                <td>Balance upto date</td>
                                <td />
                                <td align="right">{addCommas(parseFloat(lastBalance).toFixed(2))}</td>
                                <td align="right">{''}</td>
                                <td align="right">{addCommas(parseFloat(lastBalance).toFixed(2))}</td>
                                <td />
                              </tr>
                            </>
                         )} 

                          {openBalanceDataLoaded2 && (
                            <>
                              {openBalanceData2.map((item) => {
                                return (
                                  <tr>
                                    <td>{item.tran_Date}</td>
                                    <td>{item.filename}</td>
                                    <td>{item.description}</td>
                                    <td align="right">
                                      {' '}
                                      {item.branch === 'debit' ?
                                        addCommas(parseFloat(item.amount).toFixed(2)) : '-'}
                                    </td>
                                    <td align="right">
                                      {' '}
                                      {item.branch === 'credit' ?
                                        addCommas(parseFloat(item.amount).toFixed(2)) : '-'}
                                    </td>
                                    <td align="right">
                                      {item.bank > 0
                                        ? addCommas(parseFloat(item.bank).toFixed(2))
                                        : addCommas(Math.abs(parseFloat(item.bank).toFixed(2))) +
                                          '(debit)'}
                                    </td>
                                    <td>
                                      {item.type === 'Receipt' && (
                                        <a
                                          onClick={(e) => {
                                            history.push({
                                              pathname: '/edit_receipt',
                                              post: item,
                                            });
                                          }}
                                        >
                                          <button className="btn btn-primary">
                                            Edit
                                          </button>
                                        </a>
                                      )}
                                      {item.type === 'Voucher' && (
                                        <a
                                          onClick={(e) => {
                                            history.push({
                                              pathname: '/edit_voucher',
                                              post: item,
                                            });
                                          }}
                                        >
                                          <button className="btn btn-primary">
                                            Edit
                                          </button>
                                        </a>
                                      )}
                                      {item.type === 'Contra' && (
                                        <a
                                          onClick={(e) => {
                                            history.push({
                                              pathname: '/edit_journal',
                                              post: item,
                                            });
                                          }}
                                        >
                                          <button className="btn btn-primary">
                                            Edit
                                          </button>
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          )}
                          <tr>
                            <td colSpan={3} align="left">
                              <b>Total</b>
                            </td>
                            <td align="right" style={{ border: 0 }}>
                              {openBalanceDataLoaded2
                                ? addCommas(parseFloat(openBalanceData2[0].chq_no).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'debit'
                                ? openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}
                            </td>
                            <td align="right">
                              {openBalanceDataLoaded2
                                ? addCommas(parseFloat(openBalanceData2[0].chq_date).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'credit'
                                ? openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}
                            </td>
                            <td />
                            <td />
                          </tr>
                          <tr>
                            <td colSpan={3} align="left">
                              <b>Closing Balance</b>
                            </td>

                            <td align="right">
                              {' '}
                              {openBalanceDataLoaded2
                                ? openBalanceDataLoaded2
                                  ? openBalanceData2[0].createdTime > 0 &&
                                    addCommas(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'debit'
                                ? addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}
                            </td>
                            <td align="right">
                              {openBalanceDataLoaded2 &&
                                openBalanceData2[0].createdTime < 0 &&
                                addCommas(
                                  Math.abs(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                )}
                            </td>
                            <td />
                            <td />
                          </tr>
                        </tbody>
                      </table>
                      <br />
                      <br />
                      <div className="invoice-info"></div>
                    </div>
                  </div>
                  <br />
                  <br />

                  {/* code for excel file  */}
                  <div>
                    <table border="1px" id="id1" hidden>
                      <tbody>
                        <tr>
                          <td style={{ border: 'none' }} colSpan={6}>
                            <h3 align="center" style={{ border: 'none' }}>
                              Account Statement
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ border: 'none' }}
                            colSpan={6}
                            align="right"
                          >
                            {openBalanceData[0].ledger_name}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ border: 'none' }}
                            colSpan={6}
                            align="right"
                          >
                            Zip code: {openBalanceData[0].pin}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ border: 'none' }}
                            colSpan={6}
                            align="right"
                          >
                            Phone: {openBalanceData[0].mobile}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{ border: 'none' }}
                            colSpan={6}
                            align="right"
                          >
                            Fax : {openBalanceData[0].fax}
                          </td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <th>Particulars</th>
                          <th>Narration</th>
                          <th>Debit</th>
                          <th>Credit</th>
                          <th>Balance</th>
                        </tr>

                        {flag === 1 && (
                          <>
                            <tr>
                              <td>{openBalanceData[0].obCreated_date}</td>
                              <td>Opening balance</td>
                              <td />
                              <td align="right">
                                {openBalanceData[0].obBalance_type ===
                                  'debit' &&
                                  (openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}
                              </td>
                              <td align="right">
                                {openBalanceData[0].obBalance_type ===
                                  'credit' &&
                                  (openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}
                              </td>
                              <td align="right">
                                {openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))}
                              </td>
                            </tr>
                          </>
                        )}

                        {flag3 === 1 && (
                          <>
                            <tr>
                              <td>{sDate}</td>
                              <td>Balance upto date</td>
                              <td />
                              <td align="right">{addCommas(parseFloat(lastBalance).toFixed(2))}</td>
                              <td align="right">{''}</td>
                              <td align="right">{addCommas(parseFloat(lastBalance).toFixed(2))}</td>
                              <td />
                            </tr>
                          </>
                        )}

                        {openBalanceDataLoaded2 && (
                          <>
                            {openBalanceData2.map((item) => {
                              return (
                                <tr onclick="HighLightTR(this,'#c9cc99','cc3333');myFunction('<?php echo $row1['transactionID'];?>');">
                                  <td>{item.tran_Date}</td>
                                  <td>{item.filename}</td>
                                  <td>{item.description}</td>
                                  <td align="right">
                                    {' '}
                                    {item.branch === 'debit' &&
                                      addCommas(parseFloat(item.amount).toFixed(2))}{' '}
                                  </td>
                                  <td align="right">
                                    {' '}
                                    {item.branch === 'credit' &&
                                      addCommas(parseFloat(item.amount).toFixed(2))}
                                  </td>
                                  <td align="right">
                                    {item.bank > 0
                                      ? addCommas(parseFloat(item.bank).toFixed(2))
                                      : addCommas(Math.abs(parseFloat(item.bank).toFixed(2))) +
                                        '(debit)'}
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        )}

                        <tr>
                          <td>
                            <b>Total</b>
                          </td>
                          <td />
                          <td />
                          <td align="right">
                            <b>{openBalanceDataLoaded2
                                ? addCommas(parseFloat(openBalanceData2[0].chq_no).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'debit'
                                ? openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}</b>
                          </td>
                          <td align="right" style={{ border: 0 }}>
                            <b>{openBalanceDataLoaded2
                                ? addCommas(parseFloat(openBalanceData2[0].chq_date).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'credit'
                                ? openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}</b>
                          </td>

                          <td />
                        </tr>
                        <tr>
                          <td>
                            <b>Closing Balance</b>
                          </td>
                          <td />
                          <td align="right" />
                          <td align="right">
                            <b>{openBalanceDataLoaded2
                                ? openBalanceData2[0].createdTime > 0 &&
                                  addCommas(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))}

                              {openBalanceDataLoaded2 &&
                                openBalanceData2[0].createdTime < 0 &&
                                addCommas(
                                  Math.abs(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                )}
                            </b>
                          </td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* code for pdf file */}

                  <div id="id2" hidden>
                    <table style={{ border: ' 2px solid gray', width: '100%' }}>
                      <tbody>
                        <tr>
                          <td colSpan={6}></td>
                        </tr>
                        <tr>
                          <td colSpan={6}></td>
                        </tr>
                        <tr>
                          <td
                            style={{ border: 'none' }}
                            colSpan={6}
                            align="center"
                          >
                            {/* <h2> {openBalanceData[0].ledger_name}</h2> */}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={6}></td>
                        </tr>
                        <tr>
                          <td colSpan={6}></td>
                        </tr>
                        <tr>
                          <td colSpan={6}></td>
                        </tr>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '0px 20px 50px 20px',
                          }}
                        >
                          <div>
                            {logoImageLoaded === false ? (
                              <div
                                style={{
                                  width: '250px',
                                  height: '250px',
                                  paddingLeft: 150,
                                  paddingTop: 50,
                                }}
                              ></div>
                            ) : (
                              <div>
                                <img
                                  //src={'/assets/images/' + logo}
                                  alt="Loading..."
                                  id="logoImg1"
                                />
                              </div>
                            )}
                          </div>
                          <div align="right">
                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>
                              {profileData[0].organization_name}
                            </label>
                            <br></br>
                            {companyAddressData.map((item, index) => {
                              return (
                                <>
                                  <label
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: 12,
                                    }}
                                  >
                                    {item}

                                    {/* KOLENCHERY TOWER THIRD FLOOR <br></br>NEAR LITTLE
                            FLOWER HOSPITAL */}
                                  </label>
                                  <br></br>
                                </>
                              );
                            })}

                            <label
                              style={{ fontWeight: 'normal', fontSize: 12 }}
                            >
                              GSTIN {profileDataLoaded && profileData[0].gst_id}
                            </label>
                            <br></br>
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '0px 20px 50px',
                          }}
                        >
                          <div></div>
                          <div>
                            <label style={{ fontWeight: 'bold', fontSize: 22 }}>
                              Statement of Accounts
                            </label>
                            <hr
                              style={{
                                borderTop: '2px solid black',
                                marginTop: '-5px',
                              }}
                            ></hr>
                            <div
                              style={{
                                marginTop: '-18px',
                                textAlign: 'right',
                              }}
                            >
                              <label>
                                {console.log('line 2164 openBalanceDataLoaded2 ',openBalanceDataLoaded2)}
                                {console.log('line 2165 startDateForDisplay ',startDateForDisplay)}
                                {console.log('line 2166 endDateForDisplay ',endDateForDisplay)}

                                {openBalanceDataLoaded2 &&
                                  startDateForDisplay + ' To '}
                                {openBalanceDataLoaded2 && endDateForDisplay}
                              </label>
                            </div>
                            <hr
                              style={{
                                borderTop: '2px solid black',
                                marginTop: '-3px',
                              }}
                            ></hr>
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            margin: '-50px 20px 40px',
                          }}
                        >
                          <div align="left">
                            <label style={{ fontWeight: 'bold', fontSize: 14 }}>
                              To
                            </label>
                            <br></br>
                            <label style={{ fontWeight: 'bold', fontSize: 15 }}>
                              {openBalanceData[0].ledger_name}
                            </label>
                            <br></br>
                            <label>
                              {' '}
                              {/* GSTIN {profileDataLoaded && profileData[0].gst_id} */}
                            </label>
                          </div>
                          <div>
                            <label
                              style={{
                                backgroundColor: '#e6e6e6',
                                padding: '5px 150px 5px 10px',
                              }}
                            >
                              Account Summary
                            </label>
                            <br></br>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                margin: 5,
                              }}
                            >
                              <label>Opening Balance</label>
                              <label>
                                {flag === 1 &&
                                  ('₹' + openBalanceData[0].obOpen_balance ===
                                  ''
                                    ? 0.0
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}

                                {flag3 === 1 && addCommas(parseFloat(lastBalance).toFixed(2))}
                              </label>
                            </div>
                            {/* 
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                margin: 5,
                              }}
                            >
                              <label>Invoiced Amount</label>
                              <label>₹ 0.00</label>
                            </div> */}

                            {/* <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                margin: 5,
                              }}
                            >
                              <label>Amount Received</label>
                              <label>₹ 0.00</label>
                            </div> */}
                            <div style={{ marginTop: '-20px' }}>
                              <hr style={{ borderTop: '2px solid black' }}></hr>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '-10px',
                              }}
                            >
                              <label>Balance Due</label>
                              <label>
                                {openBalanceDataLoaded2
                                  ? openBalanceDataLoaded2
                                    ? openBalanceData2[0].createdTime > 0 &&
                                      addCommas(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                  : openBalanceData[0].obBalance_type ===
                                    'debit'
                                  ? addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                  : '0.00'}

                                {openBalanceDataLoaded2 &&
                                  openBalanceData2[0].createdTime < 0 &&
                                  addCommas(
                                    Math.abs(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                  )}
                              </label>
                            </div>
                          </div>
                        </div>

                        <tr>
                          <th style={{ border: ' 1px solid gray' }}>
                            {' '}
                            <b>Date</b>
                          </th>
                          <th style={{ border: ' 1px solid gray' }}>
                            <b> Particulars</b>
                          </th>
                          <th style={{ border: ' 1px solid gray' }}>
                            <b> Narration</b>
                          </th>
                          <th
                            align="right"
                            style={{ border: ' 1px solid gray' }}
                          >
                            <b> Debit</b>
                          </th>
                          <th
                            align="right"
                            style={{ border: ' 1px solid gray' }}
                          >
                            <b> Credit</b>
                          </th>
                          <th
                            align="right"
                            style={{ border: ' 1px solid gray' }}
                          >
                            <b> Balance</b>
                          </th>
                        </tr>
                        {flag === 1 && (
                          <>
                            <tr>
                              <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {openBalanceData[0].obCreated_date}
                              </td>
                              <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                Opening balance
                              </td>
                              <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              />
                              <td
                                align="right"
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {openBalanceData[0].obBalance_type ===
                                  'debit' &&
                                  (openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}
                              </td>
                              <td
                                align="right"
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {openBalanceData[0].obBalance_type ===
                                  'credit' &&
                                  (openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2)))}
                              </td>
                              <td
                                align="right"
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))}
                              </td>
                            </tr>
                          </>
                        )}

                        {flag3 === 1 && (
                          <>
                            <tr>
                              <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {sDate}
                              </td>
                              <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                Balance upto date
                              </td>
                              <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              />
                              <td
                                align="right"
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {addCommas(parseFloat(lastBalance).toFixed(2))}
                              </td>
                              <td
                                align="right"
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {''}
                              </td>
                              <td
                                align="right"
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              >
                                {addCommas(parseFloat(lastBalance).toFixed(2))}
                              </td>
                              {/* <td
                                style={{
                                  borderTop: '1px solid gray',
                                  borderBottom: '1px solid gray',
                                  borderRight: ' 1px solid gray',
                                }}
                              /> */}
                            </tr>
                          </>
                        )}

                        {openBalanceDataLoaded2 && (
                          <>
                            {openBalanceData2.map((item) => {
                              return (
                                <tr onclick="HighLightTR(this,'#c9cc99','cc3333');myFunction('<?php echo $row1['transactionID'];?>');">
                                  <td
                                    style={{
                                      borderTop: '1px solid gray',
                                      borderBottom: '1px solid gray',
                                      borderRight: ' 1px solid gray',
                                    }}
                                  >
                                    {item.tran_Date}
                                  </td>
                                  <td
                                    style={{
                                      borderTop: '1px solid gray',
                                      borderBottom: '1px solid gray',
                                      borderRight: ' 1px solid gray',
                                    }}
                                  >
                                    {item.filename}
                                  </td>
                                  <td
                                    style={{
                                      borderTop: '1px solid gray',
                                      borderBottom: '1px solid gray',
                                      borderRight: ' 1px solid gray',
                                    }}
                                  >
                                    {item.description}
                                  </td>
                                  <td
                                    align="right"
                                    style={{
                                      borderTop: '1px solid gray',
                                      borderBottom: '1px solid gray',
                                      borderRight: ' 1px solid gray',
                                    }}
                                  >
                                    {' '}
                                    {item.branch === 'debit' &&
                                      addCommas(parseFloat(item.amount).toFixed(2))}{' '}
                                  </td>
                                  <td
                                    align="right"
                                    style={{
                                      borderTop: '1px solid gray',
                                      borderBottom: '1px solid gray',
                                      borderRight: ' 1px solid gray',
                                    }}
                                  >
                                    {' '}
                                    {item.branch === 'credit' &&
                                      addCommas(parseFloat(item.amount).toFixed(2))}
                                  </td>
                                  <td
                                    align="right"
                                    style={{
                                      borderTop: '1px solid gray',
                                      borderBottom: '1px solid gray',
                                      borderRight: ' 1px solid gray',
                                    }}
                                  >
                                    {item.bank > 0
                                      ? addCommas(parseFloat(item.bank).toFixed(2))
                                      : addCommas(Math.abs(parseFloat(item.bank).toFixed(2))) +
                                        '(debit)'}
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        )}

                        <tr>
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          >
                            <b>Total</b>
                          </td>
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                          <td
                            align="right"
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          >
                            <b>
                              {/* {openBalanceDataLoaded2
                                ? addCommas(openBalanceData2[0].chq_no)
                                : openBalanceData[0].obBalance_type ===
                                    'debit' &&
                                  (openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(openBalanceData[0].ob))} */}
                              {openBalanceDataLoaded2
                                ? addCommas(parseFloat(openBalanceData2[0].chq_no).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'debit'
                                ? openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}
                            </b>
                          </td>
                          <td
                            align="right"
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          >
                            <b>
                              {/* {openBalanceDataLoaded2
                                ? addCommas(openBalanceData2[0].chq_date)
                                : openBalanceData[0].obBalance_type ===
                                    'credit' &&
                                  (openBalanceData[0].obOpen_balance === ''
                                    ? 0.0
                                    : addCommas(openBalanceData[0].ob))} */}
                              {openBalanceDataLoaded2
                                ? addCommas(parseFloat(openBalanceData2[0].chq_date).toFixed(2))
                                : openBalanceData[0].obBalance_type === 'credit'
                                ? openBalanceData[0].obOpen_balance === ''
                                  ? 0.0
                                  : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))
                                : '0.00'}
                            </b>
                          </td>
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                        </tr>

                        <tr>
                          <td
                            colspan="6"
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          >
                            &nbsp;
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          >
                            <b>Closing Balance</b>
                          </td>
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                          <td
                            align="right"
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                          <td
                            align="right"
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          >
                            <b>
                              {openBalanceDataLoaded2
                                ? openBalanceData2[0].createdTime > 0 &&
                                  addCommas(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                : addCommas(parseFloat(openBalanceData[0].ob).toFixed(2))}
                              {openBalanceDataLoaded2 &&
                                openBalanceData2[0].createdTime < 0 &&
                                addCommas(
                                  Math.abs(parseFloat(openBalanceData2[0].createdTime).toFixed(2))
                                )}
                            </b>
                          </td>
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                          <td
                            style={{
                              borderTop: '1px solid gray',
                              borderBottom: '1px solid gray',
                              borderRight: ' 1px solid gray',
                            }}
                          />
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="row" align="center">
                    <ReactToExcel
                      table="id1"
                      filename="statement_excelFileIntuisyz"
                      sheet="sheet 1"
                      buttonText="Export Excel"
                      className="btn btn-primary"
                    />

                    {/* <button
                      className="btn btn-primary"
                      type="submit"
                      name="print"
                    >
                      Export excel
                    </button> */}

                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        prints('printrec');
                      }}
                    >
                      Export pdf
                    </button>
                  </div>

                  {/* <div className="row" align="center">
                  
                    <form
                      style={{ display: 'inline' }}
                      method="POST"
                      action="export_excel_statement.php"
                    >
                      <input
                        type="hidden"
                        name="id"
                        defaultValue="<?php echo $id;?>"
                      />
                      <input
                        type="hidden"
                        name="start"
                        defaultValue="<?php echo $_POST['start'];?>"
                      />
                      <input
                        type="hidden"
                        name="end"
                        defaultValue="<?php echo $_POST['end'];?>"
                      />
                      <input
                        type="hidden"
                        name="srch_by_mnths"
                        defaultValue="<?php echo $_POST['srch_by_mnths'];?>"
                      />
                      <input
                        type="hidden"
                        name="search"
                        defaultValue="<?php echo $_POST['start'];echo $_POST['srch_by_mnths'];?>"
                      />
                      <button
                        className="btn btn-primary"
                        type="submit"
                        name="print"
                      >
                        Export excel
                      </button>
                    </form>
                    <form
                      style={{ display: 'inline' }}
                      method="POST"
                      action="export_pdf_statement.php"
                      target="_blank"
                    >
                      <input
                        type="hidden"
                        name="id"
                        defaultValue="<?php echo $id;?>"
                      />
                      <input
                        type="hidden"
                        name="start"
                        defaultValue="<?php echo $_POST['start'];?>"
                      />
                      <input
                        type="hidden"
                        name="end"
                        defaultValue="<?php echo $_POST['end'];?>"
                      />
                      <input
                        type="hidden"
                        name="srch_by_mnths"
                        defaultValue="<?php echo $_POST['srch_by_mnths'];?>"
                      />
                      <input
                        type="hidden"
                        name="search"
                        defaultValue="<?php echo $_POST['start'];echo $_POST['srch_by_mnths'];?>"
                      />
                      <button
                        className="btn btn-danger"
                        type="submit"
                        name="print"
                      >
                        Export pdf
                      </button>
                    </form>
                  </div> */}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default View_statement;
