import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import DashboardBox from "../../components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "../../state/api";
import BoxHeader from "../../components/BoxHeader";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Cell, Pie, PieChart } from "recharts";
import { useMemo } from "react";

const Row3 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[500]];

    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();

    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory)
                .filter(([, value]) => value !== null)
                .map(([key, value]) => {
                    return [
                        {
                            name: key,
                            value: value,
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value,
                        },
                    ];
                }
                );
        }
    }, [kpiData]);

    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ];

    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 0.8,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.5,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.3,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.3,
            renderCell: (params: GridCellParams) =>
                (params.value as Array<string>).length,
        },
    ];

    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    rightSideText={`${productData?.length} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    rightSideText={`${transactionData?.length} latest transactions`}
                />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="i">
                <BoxHeader title="Expense Breakdown By Category" rightSideText="Where the money went" />
                <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart width={110} height={88}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>

            <DashboardBox gridArea="j">
                <BoxHeader
                    title="Overall Summary and Explanation Data"
                    rightSideText="+15%"
                />
                <Box
                    height="15px"
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width="40%"
                    ></Box>
                </Box>
                <Typography margin="0 1rem" variant="h6">
                    Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
                    ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
                    molestie volutpat et. Aegroto dum anima es spes es!
                </Typography>
            </DashboardBox>
        </>
    );
};

export default Row3;