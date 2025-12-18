import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
// Product components for deals/reviews
import {
  PriceDisplay,
  DealBadge,
  StarRating,
  BuyButton,
  ProsCons,
  SpecsTable,
  PriceComparison,
  ProductCard,
  ProductHero,
} from './product'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  // Product components - available in all MDX files
  PriceDisplay,
  DealBadge,
  StarRating,
  BuyButton,
  ProsCons,
  SpecsTable,
  PriceComparison,
  ProductCard,
  ProductHero,
}
