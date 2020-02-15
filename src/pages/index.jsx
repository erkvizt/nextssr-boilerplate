import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import Layout from '../components/Layout/Layout';
import fetch from 'isomorphic-unfetch';

const Index = ({ errorCode, posts }) => {
    if (errorCode) {
        return <Error statusCode={errorCode}></Error>
    }

    return (
        <Layout>
            Home
        </Layout>
    );
}

Index.getInitialProps = async ({res, err}) => {
    const fetchRes = await fetch('https://jsonplaceholder.typicode.com/posts');
    const errorCode = fetchRes.status > 201 ? fetchRes.status : false
    if (errorCode) {
        res.statusCode = 404;
    }
    const json = await fetchRes.json();

    return { errorCode, posts: json }
}

export default Index;