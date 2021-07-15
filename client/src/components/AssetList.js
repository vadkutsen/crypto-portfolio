import React from 'react'

export const AssetList = ({assets}) => {

    let assetEntries = assets.filter(asset => asset.name === 'BTC');
    console.log(assetEntries);

    if (!assets.length) {
        return <p className="center"></p>
    }
    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Asset Name</th>
                    <th>Price, $</th>
                    <th>Quantity</th>
                    <th>Amount, $</th>
                </tr>
                </thead>

                <tbody>
                    {assets.map((asset, index) => {
                        return (
                            <tr key={index}>
                                <td>{asset.name}</td>
                                <td>{asset.price}</td>
                                <td>{asset.quantity}</td>
                                <td>{asset.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}