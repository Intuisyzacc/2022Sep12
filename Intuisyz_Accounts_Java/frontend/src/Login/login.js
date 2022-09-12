import React, { useState, useEffect, useRef } from 'react';
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
import { successToast, errorToast } from '../common/global';
import uuid from 'react-uuid';
import { ToastContainer, toast } from 'react-toastify';
import baseUrl from '../Base Url/baseUrl';
import { parse } from 'uuid';
import Modal from 'react-modal';
import '../Login/style.css';
import { useCookies } from 'react-cookie';
import bcrypt from 'bcryptjs';

const Login = () => {
  let url = baseUrl.url;
  let history = useHistory();
  let location = useLocation();
  console.log('history.go back', window.location.pathname);

  const [cookies, setCookie] = useCookies(['user']);
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [validationMsg, setValidationMsg] = useState();
  //const [validationMsg2, setValidationMsg2] = useState();

  var CryptoJS = require('crypto-js');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  const submitFinal = handleSubmit((data) => {
    getData();
    let userName = data.username;
    let passWord = data.password;

    // const hashedPassword = bcrypt.hashSync(
    //   passWord,
    //   '$2a$10$CwTycUXWue0Thq9StjUM0u'
    // ); // hash created previously created upon sign up

    // var ciphertext = CryptoJS.AES.encrypt(
    //   passWord,
    //   'my-secret-key@123'
    // ).toString();

    console.log('userName', userName, '  ', 'password', passWord, ' ');
    axios
      .get(url + `userSearch?userName=${userName}`)
      .then(({ data }) => {
        console.log('line 68 data ',data);
        if (data.length == 0) { //Invalid Username
          //setValidationMsg2(true);
          setValidationMsg(true);
        } else { // There is a user with that username
        
    axios
      .get(url + `login?userName=${userName}&password=${passWord}`)
      .then(({ data }) => {
        console.log('line 76 login credential', data);

        let code = data;

        var bytes = CryptoJS.AES.decrypt(data, 'my-secret-key@123');
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        console.log('decryptedData', decryptedData);

        if (decryptedData === passWord) {
          setValidationMsg(false);
          //setValidationMsg2(false);          
          axios
            .get(url + `loginDetails?userName=${userName}&password=${passWord}`)
            .then(({ data }) => {
              console.log('login details', data);

              if (data[0].user_type === 'Admin') {
                sessionStorage.setItem('logDetails', true);
                history.push({
                  pathname: '/userView',
                });
              } else {
                setName(data);

                sessionStorage.setItem('logDetails', true);
                sessionStorage.setItem('CompanyName', data[0].company_name);
                sessionStorage.setItem('CustId', data[0].cust_id);

                sessionStorage.setItem('cashIdVal', data[0].cashId);
                sessionStorage.setItem('gstIdVal', data[0].gstId);
                sessionStorage.setItem('tdsIdVal', data[0].tdsId);

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

                history.push({
                  pathname: '/',
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else { //Incorrect login credentials
          //setValidationMsg2(false);
          setValidationMsg(true);
          sessionStorage.setItem('logDetails', false);
          history.push({
            pathname: '/login',
          });

          history.pushState(null, null, location.href);
          window.onpopstate = function (event) {
            history.go(1);
          };
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }// end of else
    })
    .catch((err) => {
      console.log(err);
    });
  });

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    //setIP(res.data.IPv4);
  };

  return (
    <div className="loginBody">
      <div className="wrapper-container">
        <a href="index-2.html">
          <img
            src="img/logo-big.png"
            alt=""
            className="retina-ready"
            width={59}
            height={49}
          />
        </a>
      </div>
      <div>Accounts</div>
      <div id="login-form-wrap">
        <h2>SIGN IN</h2>
        <form id="login-form">
          <p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="User Name"
              {...register('username', {
                required: true,
              })}
            />
            <div
              id="warning_group"
              style={{ color: 'red' }}
            >
              {errors.username && (
                <p>Username is required.</p>
              )}
              {/*{validationMsg2 && (
                <p>Invalid Username</p>
              )}*/}
            </div>            
          </p>
          <p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              {...register('password', {
                required: true,
              })}
            />
            <i class="bi bi-eye-slash" id="togglePassword"></i>
            <div
              id="warning_group"
              style={{ color: 'red' }}
            >
              {errors.password && (
                <p>Password is required.</p>
              )}
              {validationMsg && (
                <p>Invalid login credentials</p>
              )}
            </div>            
          </p>
          <p className="textAlignRight">
            <input
              type="submit"
              id="login"
              value="Sign me in"
              style={{
                width: '30%',
              }}
              onClick={(e) => {
                e.preventDefault();
                submitFinal();
              }}
            />
          </p>
        </form>
        <div id="create-account-wrap">
          <p>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </p>
        </div>
        {/*create-account-wrap*/}
      </div>
    </div>
  );
};
export default Login;
