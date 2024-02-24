<template>
    <div>
        <canvas ref="pieChart" width="350" height="350"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';
import dashboardAPI from '../../../services/dashboard';

export default {
    name: 'BieuDo',
    data() {
        return {
            thongke: {},
            chartInstance: null,
        };
    },
    mounted() {
        // Fetch ThongKeBaiViet data and then render the pie chart
        this.ThongKe().then(() => {
            this.renderPieChart();
        });
    },
    methods: {
        async ThongKe() {
            try {
                const res = await dashboardAPI._thongKeBaiViet();
                console.log(res.data);
                this.thongke = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        renderPieChart() {
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            const ctx = this.$refs.pieChart.getContext('2d');
            this.chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Tổng số bài viết', 'Bài viết chưa duyệt'],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            backgroundColor: ['#FF6384', '#4EC64E'],
                            data: [this.thongke.TongBaiViet, this.thongke.BaiVietChuaDuyet],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        },
    },
};
</script>