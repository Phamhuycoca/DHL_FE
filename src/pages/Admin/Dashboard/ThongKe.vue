<template>
    <div>
        <canvas ref="myChart"></canvas>
    </div>
</template>
  
<script>
import dashboardAPI from '@/services/dashboard';
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            thongke: [],
            chartInstance: null,
        };
    },
    mounted() {
        this.ThongKe();
    },
    methods: {
        ThongKe() {
            dashboardAPI._thongKeTheoTuan().then(res => {
                this.thongke = res.data;
                console.log(this.thongke);
                this.updateChartData();
            }).catch(error => {
                console.log(error);
            });
        },
        updateChartData() {
            const ctx = this.$refs.myChart.getContext('2d');

            // Set up chart data here, after you have thongke data
            const data = {
                labels: ['Tuần một', 'Tuần hai', 'Tuần ba', 'Tuần bốn'],
                datasets: [
                    {
                        label: 'thống kê',
                        data: [this.thongke.TuanMot, this.thongke.TuanHai, this.thongke.TuanBa, this.thongke.TuanBon],
                        borderWidth: 1,
                    },
                ],
            };

            // Check if chartInstance exists, destroy it before creating a new one
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            this.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },
};
</script>