import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Redux/UserSlice';

const Products = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  let content;

  if (status === 'Loading') {
    content = <div className='text-white'>Loading...</div>;
  } else if (status === 'Success') {
    content = (
      <ul className='bg-black text-white p-10'>
        {posts.map((post) => (
          <li key={post.id} className='mb-4'>
            <img src={post.image} alt={post.title} className='w-full mb-2' />
            <h2 className='text-2xl'>{post.title}</h2>
            <p>{post.description}</p>
            <p className='text-xl'>${post.price}</p>
            <p className='text-sm'>{post.category}</p>
          </li>
        ))}
      </ul>
    );
  } else if (status === 'Failed') {
    content = <div className='text-red-500'>{error}</div>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Products;
