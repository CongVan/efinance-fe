import './index.css';

import ReactDOM from 'react-dom';

import App from './App';

// const init = async () => {
//   const session = localStorage.getItem('session_id');
//   try {
//     if (!validate(session)) {
//       const { data } = await ApiClient.get('/auth/session');

//       localStorage.setItem('session_id', data.session);
//       // ApiClient.defaults.headers['sessionId'] = data.session;
//       ReactDOM.render(
//         <>
//           <App />
//         </>,
//         document.getElementById('root'),
//       );
//     }
//   } catch (error) {
//     console.log(error.response.data);
//     ReactDOM.render(
//       <>
//         <div>Application init with error, see console to get more detail</div>
//       </>,
//       document.getElementById('root'),
//     );
//   }
// };

// init();

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root'),
);
