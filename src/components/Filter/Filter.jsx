import { Label, Magnifier } from './Filter.styled';

export const Filter = ({ filter, onChange }) => {
  return (
    <Label htmlFor="">
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={onChange} />
      <Magnifier />
    </Label>
  );
};
