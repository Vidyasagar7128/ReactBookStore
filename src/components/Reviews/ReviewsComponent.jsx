import React from 'react'
import './Reviews.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function ReviewsComponent({ reviews }) {
    let names = reviews.name.split(' ')
    let shortName = names[0][0].concat(names[1][0])

    return (
        <>
            <div className='commentmain'>
                <div className='shortnamereviews'>
                    <div className='shortnamereview'>{shortName}</div>
                    <div style={{ paddingLeft: '10px' }}>
                        <div style={{ fontSize: '15px', fontWeight: '500' }}>{reviews.name}</div>
                        <div className="commentstars">
                            <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={reviews.rating ?? "0"} />
                            </Stack>
                        </div>
                        <span style={{ fontSize: '12px' }} className='reviewcomment'>{reviews.comment}</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReviewsComponent
