import React, { useState } from 'react';
import axios from 'axios';

function SearchPage(props){
    const [Search, setSearch] = useState("");
 
    const onSearchHandler = (event) =>{
        setSearch(event.currentTarget.value);
    }

    const onSubmitHandler = (evnet) => {
        evnet.preventDefault();

        axios.get('/api/booktrailer/search/'+Search)
        .then(res => {
            if(res.data.isSearchSuccess){
                props.history.push("/searched",res.data.data);
            }else{
                alert(res.data.message);
            }
        })
    }

    return(
        <div style = {{
            display:'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}>
                <label>검색어 입력</label>
                <input type='text' value={Search} onChange={onSearchHandler} />
                <br />
                <button type="submit">
                    검색하기
                </button>
            </form>
        </div>
    )
}

export default SearchPage;