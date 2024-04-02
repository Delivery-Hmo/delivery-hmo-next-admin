interface Data {
  page: number;
  limit: number;
}

const createStore = () => {
  let data: Data = {
    page: 1,
    limit: 5
  };

  const setData = (newData: Data) => {
    data = { ...data, ...newData };
  };

  return { setData, data };
};

export default createStore();