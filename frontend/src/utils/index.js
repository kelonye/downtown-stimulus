import Promise from 'bluebird';

export function listToRedux(list) {
  const ids = [];
  const data = {};
  list.forEach(d => {
    ids.push(d._id);
    data[d._id] = d;
  });
  return { ids, data };
}

export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const sortAndCopy = (prop, desc = true) => {
  const r1 = desc ? -1 : 1;
  const r2 = desc ? 1 : -1;
  return data =>
    data
      .sort((a, b) => {
        if (a[prop] < b[prop]) return r1;
        if (a[prop] > b[prop]) return r2;
        return 0;
      })
      .map(x => x);
};

export const updateEntry = (data, id, update) => {
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    if (entry.id === id) {
      Object.entries(update).forEach(([k, v]) => {
        entry[k] = v;
      });
      break;
    }
  }
  return data;
};
