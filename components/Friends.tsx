import React from 'react'
import styles from '../styles/Home.module.css'
import { IoPersonAddSharp } from 'react-icons/io5'


interface Friends {
    _id: string,
    name: string
}

const Friends = () => {

    const [showSearchBar, setShowSearchBar] = React.useState(false)

    const [currentSearch,setCurrentSearch] = React.useState('')

    const [results,setResults] = React.useState<Friends[]>([])

    return (
        <div className={styles.col}>
            <div className={styles.addFriends}>
                <p className={styles.headingPrimary}>Friends </p>
                <IoPersonAddSharp size={20} onClick={() => setShowSearchBar(prv => !prv)} />
            </div>

            <div className={styles.friendContainer}>
                {
                    !showSearchBar ?
                        <>
                            {
                                ['Arun Mani', 'ManiKandan', 'Sandhosh', 'Arun Mani', 'ManiKandan', 'Sandhosh'].map((d, i) => (
                                    <div key={i} className={styles.messagebar}>
                                        <p >{d}</p>
                                    </div>
                                ))
                            }
                        </>
                        : <div>

                            <form>
                                <div className={styles.searchFrnd}>
                                    <input value={currentSearch} onChange={e=>setCurrentSearch(e.target.value)} />
                                    <button>search</button>

                                    <div>
                                        {
                                            results.map(d=>(
                                                <p key={d._id}>{d.name}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                }

            </div>
        </div>
    )
}

export default Friends