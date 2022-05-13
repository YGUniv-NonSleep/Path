import { Link, Outlet, useRef } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Fragment,useState, useEffect } from "react";

const ItemEditCon = styled.div`
    width: 390px;
    height: 100%;
`;

const ItemEditSubCon = styled.div`
    margin-left: 130px;
`;

function ItemEdit(props) {
     const [prod, setProd] = useState(null);
     const [visible, setVisible] = useState(false)

    
    
    //props.currentProduct

    function change(e){

        console.log(e.target.name)

        if (e.target.name == 'exposure') {
            setProd((p)=>({
                ...p,
                [e.target.name] : e.target.checked
            }))
            
        } else {
            setProd((p)=>({
                ...p,
                [e.target.name] : parseInt(e.target.value)
            }))
            
        }
        
        console.log(prod);
        
        // props.visiblePatchForm(state)
        // console.log(state)
        // setState({price:e.target.value})

    }

    function visiblePatch(product){
        setProd(product)
        setVisible(true)

    }


    

    return (
        <ItemEditCon>
            <ItemEditSubCon>
            { props.products.map((product, index) => {                    
                    return (
                        <Fragment key={index} >
                            <div>상품이름: {product.prodBasic.name}</div>
                            {/* <div>상품 판매 여부: {it.exposure}</div> */}
                            <div>상품가격: {product.price}</div>
                            <div>상품재고: {product.stock}</div>
                            <button onClick={() => {visiblePatch(product)}} >수정하기</button>
                            <button onClick={() => {props.deleteProduct(product.id)}} >삭제하기</button>
                            <br></br>
                            <br></br>
                            {/* <div>상품옵션이름: {it.optionList[0].name}</div> */}
                            {/* <div>상품상세옵션이름: {it.optionList[0].detailOptionList[0].name}</div>
                            <div>상품상세옵션가격: {it.optionList[0].detailOptionList[0].price}</div> */}                            
                        </Fragment>
                        
                    )
                  })
                }

                { visible ? 
                <div>
                    <p>상품 관리 화면</p>
                    <form 
                    //onSubmit={props.patchProduct}
                     onSubmit={props.patchProduct.bind(this,prod)}
                     >
                        <input disabled type={"text"} placeholder={'상품명'} name={"discount_rate"} value = {prod.prodBasic.name} readOnly  />
                        <input type={"text"} placeholder={'할인률'} name={"discount"} value={prod.discount} onChange={change}
                        //onChange={props.changeValue} 
                        />
                        <input type="text" placeholder={'가격'} name={"price"} value={prod.price}   onChange={change}
                        //onChange={(event) => props.changeValue(event.target.value , event.target.name)}  
                        
                         />
                        <input type={"text"} placeholder={'재고'} value={prod.stock} name={"stock"} onChange={change} 
                        //onChange={props.changeValue} 
                        />
                        <br></br>
                        <p>상품 노출</p>
                        <input type={"checkbox"} name={"exposure"} checked={prod.exposure} onChange={change}  />                        
                        <button>옵션 보기</button>
                        <button>취소하기</button>
                        <button type={"submit"}>수정 완료</button>                
                    </form>
                </div>  
                : <h2>안보영</h2> }
                
                <Outlet></Outlet>
            </ItemEditSubCon>
        </ItemEditCon>
    )
}

ItemEdit.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ItemEdit;