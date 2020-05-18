import NProgress from 'nprogress';
import Promise from 'bluebird';
import fetch from 'unfetch';
import { stringify } from 'query-string';
import cache from './cache';

export function xhr(method, url, payload, headers = {}) {
  method = method.toUpperCase();

  const opts = {
    credentials: 'omit',
    method,
    mode: 'cors',
    // referrerPolicy: 'no-referrer-when-downgrade',
    headers: {
      accept: 'application/json',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'content-type': 'application/json',
      // 'sec-fetch-mode': 'cors',
      // 'sec-fetch-site': 'same-site',
      ...headers,
    },
  };

  if (payload) {
    if ('GET' === method) {
      url += `?${stringify(payload, {
        arrayFormat: 'none',
      })}`;
    } else {
      if (
        opts.headers['Content-Type'] &&
        -1 !== opts.headers['Content-Type'].search('www')
      ) {
        opts.body = stringify(payload, {
          arrayFormat: 'none',
        });
      } else {
        opts.body = JSON.stringify(payload);
        // if (!('Content-Type' in opts.headers)) {
        //   opts.headers['Content-Type'] = 'application/json';
        // }
      }
    }
  }

  const token = cache('token');
  if (token) {
    opts.headers.Authorization = `Bearer ${token}`;
  }

  NProgress.start();
  NProgress.set(0.4);

  return new Promise((resolve, reject) => {
    fetch(url, opts)
      .then(res => {
        NProgress.done();
        if (200 === res.status) {
          // return res.json();
          return res.text().then(data => {
            try {
              return JSON.parse(data);
            } catch (e) {
              console.error(e);
              return {};
            }
          });
        } else {
          const err = new Error(res.statusText);
          err.response = res;
          throw err;
        }
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        if (!err.response) return reject(new Error('unexpected error occured'));
        err.response.text().then(msg => {
          reject(new Error(msg));
        });
      });
  });
}
