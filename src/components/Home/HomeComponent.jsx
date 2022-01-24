import React, { useState, useEffect } from 'react'
import './Home.css'
import "antd/dist/antd.css";
import { Select } from 'antd';
import BookComponent from '../Book/BookComponent';
import { GetBooksService } from '../../services/BookServices';

function HomeComponent() {
    const { Option } = Select;
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const [books, setBooks] = useState([])
    useEffect(() => {
        AllBooks()
    }, [])
    const AllBooks = () => {
        GetBooksService().then((res) => {
            setBooks(res.data.response)
            console.log(res.data.response)
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
        <>
            <div className='mainhome'>
                <div className='homeheader'>
                    <div className='booksqty'>
                        <span style={{ fontSize: '27px' }}>Books</span> <span style={{ color: '#9D9D9D' }}>({books.length} items)</span>
                    </div>
                    <div className='sortbooks'>
                        <Select style={{ width: '150px', fontSize: '12px' }} onChange={handleChange} placeholder="Sort by relevance">
                            <Option value="Price : Low To High">Price : Low To High</Option>
                            <Option value="Price : High To Low">Price : High To Low</Option>
                            <Option value="Newest Arrivals">Newest Arrivals</Option>
                        </Select>
                    </div>
                </div>
                <div className='bookcomponent'>
                    {
                        books.map((data) => <BookComponent key={data.bookId} book={data} />)
                    }
                </div>
            </div>
        </>
    )
}

export default HomeComponent
