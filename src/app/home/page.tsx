import { get } from "../services/http";

const Home = async () => {
  const res = await get("");

  return (
    <div>{JSON.stringify(res)}</div>
  );
};

export default Home;