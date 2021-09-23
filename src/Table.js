import React, { useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import './Table.css';



/*const Table=()=>{

    const data=[
        {
            name:'ram', age:10
        },
        {
            name:'riya', age:20
        },
    ]
    const columns=[
        {
            title:'Name', field:'name',
        },
        {
            title:'Age', field:'age',
        }
    ]
    return(
        <div>
            <MaterialTable title="Peoples"
            data={data}
            columns={columns}
            />
        </div>
    )}
    export default Table;*/

const Table= () =>
{
    const[data , setData]= useState()
   
    const columns = [
        {title: "NAME", field:"name"},
        {title: "HEIGHT", field:"height"},
        {title: "BODY-MASS", field:"mass"},
        {title: "HAIR-COLOR", field:"hair_color"},
        {title: "SKIN-COLOR", field:"skin_color"},
        {title: "EYE-COLOR", field:"eye_color"},
        {title: "BIRTH-YEAR", field:"birth_year"},
        {title: "GENDER", field:"gender"},
        {title: "SPECIES", field:"species"}

    ]


    useEffect( ()=> {
        fetch("https://swapi.dev/api/people/?page=2")
        .then(resp=>resp.json())
        .then(resp=>{
            console.log(resp)
            setData(resp.results)
        })
    },[])

    const CheckSpecies = (SpeciesString) =>{
      //console.log(typeof(SpeciesString))
     
        if (SpeciesString.includes('2'))
            return "droid"
        else if (SpeciesString.includes('1'))
            return "human";
        else {
            return "others";
        }
    }

    const newSpecies = data?.map((ele)=>{
            ele.species = CheckSpecies(ele.species )
            return ele
        })

    const displaySpecies = newSpecies?.map((eles)=>{
        if(eles.species=="others"){
        return <i class="fa fa-android" aria-hidden="true"></i>
        }
    })
    
    return (
        <div className="table-class">
            <MaterialTable 
                title="PEOPLE'S DATA"
                data={displaySpecies}
               columns={columns}
                options={{
                    paging:true,
                    pageSize:10,       // make initial page size
                    emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
                    showFirstLastPageButtons: true, // to display first and 
                   
                    
                  }}

                />
        </div>
    )
}

export default Table;