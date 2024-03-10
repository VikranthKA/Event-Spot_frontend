import * as React from 'react';
import { memo } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import "./Card.css"

function giveCatImage(name){
  if(name=="Horror") return "https://imgs.search.brave.com/oTCjP27NqgYksqcW5A-xZrKl8ZtrLk48_dM21EJ1klI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGV4dHN0dWRpby5j/b20vb3V0cHV0L3By/ZXNldC9wcmV2aWV3/L2xhcmdlLzAvMy8w/LzMvMzAzXzFlNDQz/LndlYnA"
  if(name=="Fantasy") return "https://imgs.search.brave.com/jjXhFVjUSt-_-euSzhWdWcTtc2XLDU2bpUdAl16J-y4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzI5LzIxLzA1/LzM2MF9GXzUyOTIx/MDU4Ml9kblBnRjd3/QzZjMUxwdEV3VzBQ/YlE3QTFjcVR2Zng3/My5qcGc"
  if(name=="Documentry") return "https://imgs.search.brave.com/5IM1QoTDf2h80b69Pez0UOwDcUuEhVoxTPRZGAZLlTA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YW50YXJjdGljYWd1/aWRlLmNvbS9zdG9y/YWdlL2FwcC9tZWRp/YS91cGxvYWRlZC1m/aWxlcy8xNjA1MTg0/NjE1NzE0LmpwZWc"

  if(name=="Cultural") return "https://imgs.search.brave.com/EIUpWyPTKv8pXozpJj6JqFPLW5DhVaV_icrHVnOCpqQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjM3/MDgwODg0L3Bob3Rv/L2N1bHR1cmUtZnJv/bS13b29kZW4tbGV0/dGVycy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9MnRyOFNL/NFlpaEViSy1XanJP/Q2FEMHpiY09pV2h5/bTZGUEkwNXVZd0hi/ST0"
  if(name=="Concert") return "https://imgs.search.brave.com/8pR4gF6HxObbcDu5EWAqy5iFYhnTpRk-omQ0G7Kve1k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDgz/NDk1MjEwL3Bob3Rv/L2NvbmNlcnQtY3Jv/d2QuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVpzNTk0bThm/NUxKN0RxSlRLMnk2/Vi1Tb2p3dmtFUXRn/aU5Pc20wQTJzTmM9"
  if(name=="Comedy") return "https://imgs.search.brave.com/l9WSxkIh4HL0gvcecIqb-QKgJv3rH-JrXJvx_6YGKbI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzIyLzYwLzgx/LzM2MF9GXzEyMjYw/ODE5Nl9wc2JwUVRx/T2pYZDBSN2MyRGFY/SlpFNm9Id0FCMUtH/Zy5qcGc"
  if(name=="Coding") return "https://imgs.search.brave.com/nfrrF8YIrDXeV2Mv9ZH8rrUFg4x4DY86KOSO55GoHPg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzg4LzkxLzA1/LzM2MF9GXzE4ODkx/MDUxMF9YWFFQMnZn/V1JPRVpvMFk4N21v/UFUzQzdCZjFYd1JS/Sy5qcGc"
  if(name=="Travelling") return "https://imgs.search.brave.com/NY3C9W09awWazTlK53b5hJONq5N8jbKpuoexB-K-HOk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG90ZWZsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMi8x/Mi9UcmF2ZWxpbmct/b3ItVHJhdmVsbGlu/Zy0xMDI0eDc2OC5q/cGc"
  
  if(name.includes("abcd")) return "https://imgs.search.brave.com/gQ3vHaT94ir8W9V_0EbcYj-pS2xVDJmFOqiXaPZ1HGo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZWNvZGVjYW1w/Lm9yZy9uZXdzL2Nv/bnRlbnQvaW1hZ2Vz/L3NpemUvdzIwMDAv/MjAyMi8wOC9wZXhl/bHMtam9zaC1zb3Jl/bnNvbi0xNzE0MjA4/LmpwZw"
  return "https://imgs.search.brave.com/QUqSJHBu3XL5MT04QzvwpEtKEQvoKH9e9qI7Js7y38I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL3NpZGUv/Y3JlYXRlLXZhcmlv/dXMtdHlwZXMtb2Yt/cmFuZG9tLWltYWdl/LXVzaW5nLWZvdG9y/LXJhbmRvbS1pbWFn/ZS1nZW5lcmF0b3Iu/anBn"
}

 function CarouselCatCard({
  categoryId,
  events,
  name
}) {
  return (
    <Link style={{marginTop:"10%"}} to={`/category/${categoryId}/${name}`}>
    <Card
      className='Card'
    sx={{ borderRadius: '50%', height: 140, width: 140, margin: 'auto' }}>
    <CardMedia
        sx={{ height: 140}}
        image={giveCatImage(name)}

    />
      <CardContent>


      </CardContent>

    </Card>
    <Typography gutterBottom variant="h6" component="div" sx={{marginLeft:"7%",fontStyle:"oblique"}}>
          {name}
        </Typography>
    </Link>
  );

  }

  export default memo(CarouselCatCard)
