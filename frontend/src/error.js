export default function errorfunction(err) {
  console.error('Error response:');
  console.error(err.response.data); // ***
  console.error(err.response.status); // ***
  console.error(err.response.headers); // ***
  alert(
    'Something went wrong with the request, check the fields again and see the console for more details'
  );
}
