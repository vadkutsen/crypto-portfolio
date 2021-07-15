import React, {useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {AssetList} from '../components/AssetList'
// import {useHistory} from 'react-router-dom'

export const HomePage = () => {
    // const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    // const [link, setLink] = useState('')
    const [assets, setAssets] = useState([])
    const [name, setName] = useState('')
    // const [asset, setAsset] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    // const pressHandler = async event => {
    //     if (event.key === 'Enter') {
    //         try {
    //             const data = await request('/api/link/generate', 'POST', {from: link}, {
    //                 Authorization: `Bearer ${auth.token}`})
    //             history.push(`/detail/${data.link._id}`)
    //         } catch (e) {}
    //     }
    // }
    const submitHandler = async event => {
        event.preventDefault();
        try {
            setAssets([...assets, {
                name: name,
                price: price,
                quantity: quantity,
                amount: quantity * price
            }])
            setName('')
            setPrice('')
            setQuantity('')
            // await request(
            //     '/api/asset',
            //     'POST',
            //     {name: asset, price: price, quantity: quantity},
            //     {Authorization: `Bearer ${auth.token}`}
            // )
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <h2>Averaging Calculator</h2>
                <div className="row">
                    <form className="col s12" onSubmit={submitHandler}>
                        <div className="row">
                            <div className="input-field col s3">
                                <input
                                    id="asset_name"
                                    type="text"
                                    required
                                    className="validate"
                                    value={name}
                                    onChange={e => setName(e.target.value.toUpperCase())}
                                />
                                <label htmlFor="asset_name">Asset Name</label>
                            </div>
                            <div className="input-field col s3">
                                <input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.00000001"
                                    required
                                    className="validate"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                                <label htmlFor="price">Price, $</label>
                            </div>
                            <div className="input-field col s3">
                                <input
                                    id="quantity"
                                    type="number"
                                    min="0"
                                    step="0.00000001"
                                    required
                                    className="validate"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                                <label htmlFor="quantity">Quantity</label>
                            </div>
                            <button className="btn btn-large waves-effect waves-light center" type="submit" name="action">Add</button>
                        </div>
                    </form>
                </div>
                <div>
                    <AssetList assets={assets} />
                </div>
                
                
                {/* <div className="input-field">
                    <input
                        // placeholder="john.doe@email.com"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter Link</label>
                </div> */}
            </div>
        </div>
    )
}