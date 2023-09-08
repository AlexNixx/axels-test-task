import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
`

export const StyledCard = styled(Card)`
  width: 18rem;
  height: 25rem;
  overflow: hidden;
  cursor: pointer;
  
`

export const StyledImage = styled(Card.Img)`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  transition: transform 0.25s;

  &:hover {
    transform: scale(1.05);
  }
`