import Head from 'next/head'
import Dasboard from '../components/Dasboard'
import Auth from '../components/Auth/Auth'
import { GetServerSideProps } from 'next'
import { ToastContainer } from 'react-toastify'


export default function Home(props: any) {

  const { authorized } = props

  return (
    <>
      <Head>
        <title>Expense Tracker Application</title>
        <meta name="description" content="Expense Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      {authorized ?
        <Dasboard
          Categories={props.Categories}
          todayExpense={props.todayExpense}
          user={props.user} credit={props.credit}
          debit={props.debit}
          expenseByMonth={props.expenseByMonth}
          totalExpense={props.totalExpense} />
        : <Auth />
      }
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jwt = ctx.req.cookies.token;

  const { req } = ctx;

  let url = req.headers.referer as string;

  let arr = url.split('/');

  url = `${arr[0]}//${arr[2]}`;

  if (jwt) {

    const res = await fetch(`${url}/api/dasboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": jwt
      },
    });
    let response = await res.json();

    return {
      props: {
        authorized: true,
        user: response.user,
        credit: response.credit,
        debit: response.debit,
        Categories: response.Categories,
        todayExpense: response.todayExpense,
        expenseByMonth: response.expenseByMonth,
        totalExpense: response.totalExpense
      },
    };
  }

  return {
    props: {
      authorized: jwt ? true : false,
    },
  };
}
