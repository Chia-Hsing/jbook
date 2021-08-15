import { useTypedSelector } from '../hooks/useTypedSelector'
const CellList: React.FC = () => {
    useTypedSelector(state => state)

    return <div>cell</div>
}

export default CellList
