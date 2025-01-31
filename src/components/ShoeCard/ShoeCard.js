import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          { variant === 'on-sale' ? <SaleFlag>Sale</SaleFlag> : undefined }
          { variant === 'new-release' ? <NewFlag>Just released!</NewFlag> : undefined }
        </ImageWrapper>
        
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          { variant === 'on-sale' ?
            <StrikePrice><s>{formatPrice(price)}</s></StrikePrice> :
            <Price>{formatPrice(price)}</Price>}
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : undefined }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 300px;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const StrikePrice = styled(Price)`
  color: ${COLORS.gray[700]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.p`
  position: absolute;
  z-index: 1;
  width: fit-content;
  padding: 8px;
  border-radius: 4px;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.gray[100]};
  background: var(--background);
  top: 12px;
  right: -4px;
`;

const SaleFlag = styled(Flag)`
  background: ${COLORS.primary};
`;

const NewFlag = styled(Flag)`
  background: ${COLORS.secondary};
`;

export default ShoeCard;
