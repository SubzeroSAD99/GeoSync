import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--main-color);
  padding: 10px;
  border-radius: 5px;
  position: relative;
  width: 100%;
  max-width: 600px;
  overflow: visible;

  & > label {
    position: absolute;
    font-size: 0.9rem;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: gray;
    padding: 0px 5px;
    background-color: transparent;
    transition: left 0.2s linear, transform 0.3s ease-in-out,
      color 0.3s ease-in-out, background-color 0.2s ease;
  }

  & > input {
    border-radius: 5px;
    border: none;
    height: 28px;
    outline: none;
    padding: 5px;
    font-size: 0.9rem;
  }

  & > input:focus + label,
  & > input:not(:placeholder-shown) + label {
    left: 20px;
    transition: left 0.2s linear, transform 0.3s ease-in-out,
      color 0.3s ease-in-out, background-color 0.3s ease 0.2s;
    transform: translateY(-36px);
    background-color: var(--bg-secundary-color);
    color: var(--text-color);
  }
`;

export { InputContainer };
