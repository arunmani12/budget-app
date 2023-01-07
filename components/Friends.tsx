import React from 'react'
import styles from '../styles/Home.module.css'
import { IoPersonAddSharp,IoCaretBackCircleSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'



interface Friends {
  _id: string,
  name: string,
  isFriends: boolean
}

const Friends = ({ friends }: { friends: any }) => {

  const [showSearchBar, setShowSearchBar] = React.useState(false)

  const [currentSearch, setCurrentSearch] = React.useState('')

  const [result, setResult] = React.useState<Friends>()

  const [loading, setLoading] = React.useState(false)

  const router = useRouter();

  const onAddFriendHandler = async () => {

    setLoading(true)

    if (result?.isFriends) {
      setLoading(false)
      return
    }

    const res = await fetch(`/api/addfriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: result?._id
      }),
    });
    let response = await res.json();

    if (response.message === 'success') {
      setResult(undefined)
      router.replace(router.asPath);
      setLoading(false)
    }
    else {
      alert('something went to wrong')
      setLoading(false)
    }

  }

  const searchHandler = async () => {
    setLoading(true)

    const res = await fetch(`/api/searchuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: currentSearch
      }),
    });
    let response = await res.json();

    if (response.message == "success") {
      setLoading(false)

      setResult({ ...response.user })

    } else {
      setLoading(false)
      //   setLoading(false)
      setResult(undefined)

    }
  };

  return (
    <div className={styles.col}>
      <div className={styles.addFriends}>
        <p className={styles.headingPrimary}>Friends </p>
        {!showSearchBar ? <IoPersonAddSharp size={20} onClick={() => setShowSearchBar(prv => !prv)} /> 
        :<IoCaretBackCircleSharp size={20} onClick={() => setShowSearchBar(prv => !prv)} /> 
        }
      </div>

      <div className={styles.friendContainer}>
        {
          !showSearchBar ?
            <>
              {
                friends.map((d: any) => (
                  <div key={d.id} className={styles.messagebar}>
                    <p >{d.name}</p>
                  </div>
                ))
              }
            </>
            : <div>

              <form>
                <div className={styles.searchFrnd}>
                  <input value={currentSearch} onChange={e => setCurrentSearch(e.target.value)} />
                  <button type='button' onClick={searchHandler}>search</button>

                  <div>
                    {result ?
                    <>
                     <div className={`${styles.addFriends} ${styles.individual}`}>
                        <p>{result.name}</p>
                        {!result.isFriends ? <button type='button' onClick={onAddFriendHandler}>+ Add</button> : <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>&#10003;</p>}
                      </div>
                      {loading && <div style={{ marginTop: '10px' }} className="lds-hourglass"></div>}
                    </>
                      :
                      <>
                        {
                          loading ? <div style={{ marginTop: '10px' }} className="lds-hourglass"></div>
                            : <p style={{ marginTop: '10px' }}>No user found</p>
                        }
                      </>
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