import React from 'react';
import { BarChart, PieChart } from '@mui/x-charts';

import '../../../css/admin/adminDashboard.css';
import BagIcon from '../../../imgs/icons/ic-glass-bag.svg';
import UserIcon from '../../../imgs/icons/ic-glass-users.svg';
import BuyIcon from '../../../imgs/icons/ic-glass-buy.svg';
import { formatMoneyVN } from '../../../component/FormatMoney/formatMoney';

const AdminDashboard = () => {

  return (
    <div className='dashboard'>
      <div className='dashboard1'>
        {/* Div Order */}
        <div className='dashboard_blk dashboard_blk1'>
          <div className='dashboard_blkDiv1'>
            <img
              src={BagIcon}
              alt="Ảnh giỏ hàng"
              className='dashboard-img dashboard-img1'
            />
            <p
              className='dashboard-title1'
            >
              Số đơn: 1
            </p>
          </div>
          <div className='dashboard_blkDiv2'>
            <p
              className='dashboard-title2'
            >
              <span>Doanh thu: </span>{/* {formatMoneyVN(money)} */}
            </p>
          </div>
        </div>
        {/* Div User */}
        <div className='dashboard_blk dashboard_blk2'>
          <div className='dashboard_blkDiv1'>
            <img
              src={UserIcon}
              alt="Ảnh user"
              className='dashboard-img dashboard-img2'
            />
            <p
              className='dashboard-title1 dashboard-title3'
            >
              Số user: 1
            </p>
          </div>
          <div className='dashboard_blkDiv2'>
            <p
              className='dashboard-title2 dashboard-title3'
            >
              <span>Số user mới: </span>
            </p>
          </div>
        </div>
        {/* Div Product */}
        <div className='dashboard_blk dashboard_blk3'>
          <div className='dashboard_blkDiv1'>
            <img
              src={BuyIcon}
              alt="Ảnh sản phẩm"
              className='dashboard-img'
            />
            <p
              className='dashboard-title1 dashboard-title4'
            >
              Số sản phẩm: 1
            </p>
          </div>
          <div className='dashboard_blkDiv2'>
            <p
              className='dashboard-title2 dashboard-title4'
            >
              <span>Sản phẩm mới: </span>
            </p>
          </div>
        </div>
      </div>
      <div className='dashboard2'>
        <BarChart
          width={400}
          height={600}
          style={{ marginLeft: 200 }}
          series={[
            {
              data: [4, 3, 5],
            },
          ]}
          xAxis={[
            {
              scaleType: 'band',
              data: ['Page 1', 'Page 2', 'Page 3'],
            },
          ]}
          className='barChartD'
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={350}
          height={350}
        />
      </div>
    </div>
  )
}

export default AdminDashboard;