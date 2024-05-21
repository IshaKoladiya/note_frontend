import React from 'react'

export default function Header(props) {
  const {title,desc} = props;
  return (
    <>
    <div className="header text-center py-4">
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
    </>
  )
}
