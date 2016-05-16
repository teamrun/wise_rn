import server from './lib/net'; 

export const getDashboard = (user, opt) =>{
  return (dispatch) => {
    dispatch({
      type: 'dashboard_start'
    });
    console.log('start req');
    server.dashboard(user, opt)
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'dashboard_load',
          data: data
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: 'dashboard_fail',
          err: err
        });
      });
  }
}