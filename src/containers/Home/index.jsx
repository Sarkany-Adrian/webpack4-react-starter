// @flow
import React from 'react';
import Footer from 'components/Footer';

const Home = () => {
  let number: number = 5;

  number = 'test';

  return (
    <div>
      <p>{number}</p>
      <Footer />
    </div>
  );
};

export default Home;
