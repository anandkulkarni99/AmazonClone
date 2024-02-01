import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css'
import {useState} from "react";
import {useHistory} from "react-router-dom";
import AdminHeader from "./AdminHeader";
const req = require('./Constant');
export default function AddProduct(){
    const [product, setProduct]=useState({product_name: "", product_price: 0, product_description: "", pcid: 0});
    let history=useHistory();
    let [msg, setMsg]=useState("");
    let onChangeHandler=(args)=>{
        let copyProduct={...product};
        copyProduct[args.target.name]=args.target.value;
        setProduct(copyProduct)
    }
    let addProduct=()=>{
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4 && xhr.status===200){
                console.log(JSON.parse(xhr.responseText))
                setMsg("Product added successfully...")
            }
        }
        xhr.open("POST", req+"/addproduct")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(product))
    }
    return <div>
        <AdminHeader/>
        <center>
            <h3>Add Product</h3>
            <table>
                <tbody>
                <tr>
                    <td>Product name: </td>
                    <td><input type={"text"} name={'product_name'} value={product.product_name} onChange={onChangeHandler}/></td>
                </tr>
                <tr>
                    <td>Product price: </td>
                    <td><input type={"text"} name={'product_price'} value={product.product_price} onChange={onChangeHandler}/></td>
                </tr>
                <tr>
                    <td>Product description: </td>
                    <td><input type={"text"} name={'product_description'} value={product.product_description} onChange={onChangeHandler}/></td>
                </tr>
                <tr>
                    <td>Product category ID: </td>
                    <td><input type={"text"} name={'pcid'} value={product.pcid} onChange={onChangeHandler}/></td>
                </tr>
                </tbody>
            </table>
            <button className={"btn btn-primary margin"} onClick={addProduct}>Add</button>
            <button className={"btn btn-danger margin"} onClick={()=>{history.push('/products')}}>Cancel</button>
            <h6 style={{color: "red"}}>{msg}</h6>
        </center>
    </div>
}