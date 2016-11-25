export default (json) => {
  const obj = typeof json !== 'undefined' && json !== null ? JSON.parse(json) : null;
  const exist = obj !== null;

  return {
    obj,
    exist,
  };
};
