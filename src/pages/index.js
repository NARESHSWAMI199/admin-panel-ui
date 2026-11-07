import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewUsers } from 'src/sections/overview/overview-users';
import { OverviewLatestUsers } from 'src/sections/overview/overview-latest-users';
import { OverviewLatestStores } from 'src/sections/overview/overview-latest-stores';
import { OverviewGraph } from 'src/sections/overview/overview-sales';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from 'src/utils/api-request';
import { useAuth } from 'src/hooks/use-auth';
import { suId } from 'src/utils/util';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { set } from 'nprogress';





const now = new Date();

const Page = (props) => {
  const [wholesales, setWholesales] = useState([])
  const [users, setAllUsers] = useState([])
  const [currentYearDataMonths, setCurrentYearDataMonths] = useState([])
  const [lastYearDataMonths, setLastYearDataMonths] = useState([])

  const [currentYearSalesPerformance, setCurrentYearSalesPerformance] = useState([])
  const [lastYearSalesPerformance, setLastYearSalesPerformance] = useState([])

  const [years, setYears] = useState([])
  const [dashboardData, setDashboardData] = useState({
    users: {},
    retailers: {},
    wholesalers: {},
    staffs: {},
    admins: {},
  })
  const currentYear = new Date().getFullYear();
  const auth = useAuth()
  const user = auth.user
  const router = useRouter();


  // Getting All Stores 
  useEffect(() => {
    const getData = async () => {
      await apiRequest.post("/admin/store/all", {})
        .then(res => {
          const data = res.data.content;
          setWholesales(data);
        })
        .catch(err => {
          console.log(err)
        })
    }
    getData();

  }, [])

  // Get current year store count
  useEffect(() => {
    apiRequest.post("/admin/dashboard/graph/months/", {
      "year": currentYear
    })
      .then(res => {
        const months = res.data.res;
        let counts = []
        Object.keys(months).map(month => {
          counts.push(months[month])
        })
        setYears(Object.keys(months))
        setCurrentYearDataMonths(counts);
      })
      .catch(err => {
        console.log(err)
        let status = (!!err.response ? err.response.status : 0);
        if (status == 401) {
          auth.signOut();
          router.push("/auth/login")
        }
      })
  }, [auth, currentYear, router])

  // Get store count of last year
  useEffect(() => {
    apiRequest.post("/admin/dashboard/graph/months/", {
      "year": currentYear - 1
    })
      .then(res => {
        const months = res.data.res;
        let counts = []
        Object.keys(months).map(month => {
          counts.push(months[month])
        })
        setLastYearDataMonths(counts);
      })
      .catch(err => {
        console.log(err)
      })
  }, [currentYear])


  // Get all basics counts 
  useEffect(() => {
    const getData = async () => {
      await apiRequest.get("/admin/dashboard/counts")
        .then(res => {
          const data = res.data;
          setDashboardData(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    getData();

  }, [])



  // All users 


  // Getting All Stores 
  useEffect(() => {
    const getData = async () => {
      await apiRequest.post("/admin/auth/A/all", {})
        .then(res => {
          const data = res.data.content;
          setAllUsers(data);
        })
        .catch(err => {
          console.log(err)
        })
    }
    getData();

  }, [])


  // Get current year's sales performance 
  useEffect(()=>{
      const getSalesPerfomance = async () =>{
        await apiRequest.get(`/admin/dashboard/sales/performance/${currentYear}`)
        .then(res=>{
          const months = res.data.res;
          let counts = []
          Object.keys(months).map(month => {
            counts.push(months[month])
          })
          setCurrentYearSalesPerformance(counts);
        })
        .catch(err=>{
          console.log(err)
        })  
      }
      getSalesPerfomance();
  },[currentYear])



  const getPercentage = useCallback((currentCount, totalCount) => {
    return Math.round((currentCount / totalCount) * 100);
  }, [])
  return (<>
    <Head>
      <title>
        Overview | Swami sales
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={!!user && user.id != suId ? 3 : 4}
          >
            <Link href={{
              pathname: "/users"
            }}
style={{ textDecoration: 'none' }} > <OverviewUsers
                title="USERS"
                sx={{ height: '100%' }}
                value={dashboardData.users}
              /> </Link>
          </Grid>


          <Grid
            xs={12}
            sm={6}
            lg={!!user && user.id != suId ? 3 : 4}
          >
            <Link style={{
              textDecoration: 'none'
            }}
              href={{
                pathname: "/customers"
              }}
            > <OverviewUsers
                title="RETAILERS"
                sx={{ height: '100%' }}
                value={dashboardData.retailers}
              /> </Link>
          </Grid>


          <Grid
            xs={12}
            sm={6}
            lg={!!user && user.id != suId ? 3 : 4}
          >
            <Link style={{
              textDecoration: 'none'
            }}
              href={{
                pathname: "/wholesalers"
              }}>  <OverviewUsers
                title="WHOLESALERS"
                sx={{ height: '100%' }}
                value={dashboardData.wholesalers}
              /> </Link>
          </Grid>



          <Grid
            xs={12}
            sm={6}
            lg={!!user && user.id != suId ? 3 : 4}
          >
            <Link style={{
              textDecoration: 'none'
            }}
              href={{
                pathname: "/wholesalers"
              }} >  <OverviewUsers
                title='STAFFS'
                sx={{ height: '100%' }}
                value={dashboardData.staffs}
              /> </Link>
          </Grid>



          {(!!user && user.id === suId) &&
            <Grid
              xs={12}
              sm={6}
              lg={!!user && user.id != suId ? 3 : 4}
            >
              <Link style={{
                textDecoration: 'none'
              }}
                href={{
                  pathname: "/users/SA"
                }} >  <OverviewUsers
                  title='ADMINS'
                  sx={{ height: '100%' }}
                  value={dashboardData.admins}
                /> </Link>
            </Grid>
          }



          {/*     <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
           <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid> 
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>*/}

          {/* Store count graph */}
          <Grid
            xs={1}
            lg={6}
          >
            <OverviewGraph
              title="Stores"
              chartSeries={[
                {
                  name: 'This year',
                  data: currentYearDataMonths
                },
                {
                  name: 'Last year',
                  data: lastYearDataMonths
                }
              ]}
              categories={years}
              sx={{ height: '100%' }}
            />
          </Grid>

      {/* Sales performance */}

       <Grid
            xs={12}
            lg={6}
          >
            <OverviewGraph
              title="Sales Performance"
              chartSeries={[
                {
                  name: 'This year',
                  data: currentYearSalesPerformance
                },
                {
                  name: 'Last year',
                  data: lastYearSalesPerformance
                }
              ]}
              categories={years}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[
                getPercentage(dashboardData.wholesalers.all, dashboardData.users.all),
                getPercentage(dashboardData.staffs.all, dashboardData.users.all),
                getPercentage(dashboardData.retailers.all, dashboardData.users.all),
              ]}
              labels={['Wholesalers', 'Staffs', 'Retailers']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestStores
              products={wholesales}
            // sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={8}
            lg={8}
          >
            <OverviewLatestUsers
              users={users}
              sx={{ overflowX: 'auto' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>

  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
