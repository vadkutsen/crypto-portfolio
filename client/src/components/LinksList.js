import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if (!links.length) {
        return <p className="center">No links yet.</p>
    }
    return (
        <>
            <h2>Links</h2>
            <table>
        <thead>
          <tr>
              <th>#</th>
              <th>Initial Link</th>
              <th>Short Link</th>
              <th>Action</th>
          </tr>
        </thead>

        <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>Open</Link></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
        </>
    )
}