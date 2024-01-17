import React, { useState ,useEffect } from "react";
import { Link,NavLink, useNavigate } from "react-router-dom";

const NavLinkHeader = (props) => {
  return (
    // {props.title1 ?   <Link to={"/"+props.title_link}>{props.title}</Link> : props.title }
    
    <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                   {
                                    props.main_title && (
                                      <>
                                      <li class="breadcrumb-item"><a href="javascript:void(0)">{ props.main_title}</a></li>

                                      {props.title1 && <li class="breadcrumb-item">{props.title1_link ? <Link to={"/"+props.title1_link}>{props.title1}</Link> :<a href="javascript:void(0)"> {props.title1} </a> }</li>}
                                      {props.title2 && <li class="breadcrumb-item"><a href="javascript:void(0)">{props.title2} </a></li> }

                     </>
                           ) }
                                </ol>
  
          </nav>                  

  
  )
  }

export default NavLinkHeader
