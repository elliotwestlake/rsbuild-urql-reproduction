import { gql, useQuery } from "urql";
import "./App.css";

const CountriesQuery = gql`
  query {
    countries {
      emoji
    }
  }
`;

const App = () => {
  const [result] = useQuery({
    query: CountriesQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="content">
      <ul>
        {data.countries.map((country: any, i: number) => (
          <li key={i}>{country.emoji}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
