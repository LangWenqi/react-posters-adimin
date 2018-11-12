import history from './history';
import {qs} from '@/utils';
const reactRouter = history;
const search = history.location.search;
const searchStr = search ? search.split('?')[1]:'';
reactRouter.query = qs.parse(searchStr,true);
reactRouter.navigateTo = function (obj) {
    const searchQuery = `${qs.stringify(obj.query,true)}`;
    const search = searchQuery ? `?${searchQuery}` : '';
    const newObj = {...obj,search:search};
    reactRouter.push(newObj)
};
reactRouter.redirectTo = function (obj) {
    const searchQuery = `${qs.stringify(obj.query,true)}`;
    const search = searchQuery ? `?searchQuery` : '';
    const newObj = {...obj,search:search};
    reactRouter.replace(newObj)
};
export default reactRouter;
