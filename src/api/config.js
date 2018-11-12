import domainsFuc from './domains'
import {fetch_create} from './fetch'
import {TokenKeys} from '@/common/js/variable'

export default fetch_create({
  baseUrl:domainsFuc(TokenKeys.PRODUCT_ENV).domain
})
