import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import './Table.css';
import * as ReactBootStrap from 'react-bootstrap';
import Button from './Button';

const Table = () => {
  const [data, setData] = useState();
  const [isLoading, setLoding] = useState(true);
  const [curPage, setCurPage] = useState(1);
  const [isError, setError] = useState(false);

  const columns = [
    { title: 'NAME', field: 'name', Text: 'bold' },
    { title: 'HEIGHT', field: 'height', sorting: false },
    { title: 'BODY-MASS', field: 'mass', sorting: false },
    { title: 'HAIR-COLOR', field: 'hair_color', sorting: false },
    { title: 'SKIN-COLOR', field: 'skin_color', sorting: false },
    { title: 'EYE-COLOR', field: 'eye_color', sorting: false },
    { title: 'BIRTH-YEAR', field: 'birth_year', sorting: false },
    { title: 'GENDER', field: 'gender', sorting: false },
    { title: 'SPECIES', field: 'species_icon', sorting: false },
  ];
  const getData = (pageNo) => {
    return fetch(`https://swapi.dev/api/people/?page=${pageNo}`).then((resp) =>
      resp.json()
    );
  };

  useEffect(() => {
    getData(curPage)
      .then((resp) => {
        console.log(resp);
        setData(resp.results);
        setLoding(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, [curPage]);

  const displayData = data?.map((element) => {
    let speciesString;
    if (element.species.length > 0) {
      speciesString = element.species[0];
      if (speciesString === 'https://swapi.dev/api/species/1/') {
        element.species_icon = <i class='fa fa-circle'></i>;
      } else if (speciesString === 'https://swapi.dev/api/species/2/') {
        element.species_icon = <i class='fa fa-android'></i>;
      } else element.species_icon = <i class='fa fas fa-question'></i>;
    } else element.species_icon = <i class='fa fas fa-question'></i>;
    return element;
  });

  return (
    <>
      <div className='table-class'>
        {isError ? (
          <i class='fa fa-exclamation-circle' aria-hidden='true'>
            OOPS SOMETHING WENT WRONG!!
          </i>
        ) : isLoading ? (
          <ReactBootStrap.Spinner animation='border' />
        ) : (
          <div className='container'>
            <MaterialTable
              className='table-data'
              Class='m_table'
              title="PEOPLE'S DATA"
              data={displayData}
              columns={columns}
              options={{
                paging: false,
                pageSize: 10,
                emptyRowsWhenPaging: true,
                showFirstLastPageButtons: true,
                rowStyle: (data, index) =>
                  index % 2 === 0 ? null : { background: '#eee' },
                headerStyle: {
                  backgroundColor: '#000080',
                  color: 'white',
                  fontStyle: 'bold',
                },
              }}
            />
            <Button
              value={'PREVIOUS'}
              changePage={() => {
                setCurPage(curPage - 1);
              }}
            />
            <Button
              value={'NEXT'}
              changePage={() => {
                setCurPage(curPage + 1);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
