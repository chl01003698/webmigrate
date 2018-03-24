<template>
    <div>
        <Row>
            <Col span="2" :style="{textAlign:'center', lineHeight: '32px', fontSize: '14px', fontWeight: 'bold'}">邮件标题</Col>
            <Col span="2">
            <Input type="text" value="" />
            </Col>
            <Col span="2" :style="{textAlign:'center', lineHeight: '32px', fontSize: '14px', fontWeight: 'bold'}">目标</Col>
            <Col span="2">
            <Input type="text" value="" />
            </Col>
            <Col span="2" :style="{textAlign:'center'}">
                <Button type="primary">搜索</Button>
            </Col>
            <Col span="2" :push="12" :style="{textAlign:'center'}">
                <Button type="primary" @click="addMessage">添加消息</Button>
            </Col>
        </Row>

        <div class="table-content">
            <Table :columns="columns" :data="dataList" border></Table>
        </div>
    </div>
</template>

<script>
    import { getMessageList } from '../service';
    import dateformat from 'dateformat';
    export default {
        name: 'index',
        data () {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'id',
                        width: 70,
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    },
                    {
                        title: '发送目标',
                        key: 'to'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '副标题',
                        key: 'subtitle'
                    },
                    {
                        title: '邮件内容',
                        key: 'content'
                    },
                    {
                        title: '按钮类型',
                        key: 'btnTitle',
                        width: 90
                    },
                    {
                        title: '跳转目标',
                        key: 'jumpTarget'
                    },
                    {
                        title: '附件物品',
                        key: 'items',
                        width: 200,
                        render: (h, params) => {
                            let items = params.row.items;
                            let arr = [];
                            let arrType = {
                                Card: '桌卡',
                                Match: '赛卡'
                            };
                            if (items && items instanceof Array) {
                                items.forEach(content => {
                                    let item = h('p', `类型：${arrType[content.itemId]} | 数量：${content.count}`);
                                    arr.push(item);
                                });
                                if (arr.length) {
                                    return h('div', arr);
                                }
                            }
                            return h('span', {style: {color: '#999'}}, '没有附加商品');
                        }
                    },
                    {
                        title: '附加文字',
                        key: 'fujiawenzi'
                    },
                    {
                        title: '定时发送时间',
                        key: 'timing',
                        render: (h, params) => {
                            if (params.row.timing) {
                                return h('span', dateformat(params.row.date, 'yyyy-mm-dd HH:MM'));
                            }
                            return h('span', '立即发送');
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 70
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 130,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push('/editMessage?isEdit=1');
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                dataList: [],
                page: 1
            };
        },
        methods: {
            addMessage () {
                this.$router.push('/addMessage');
            },
            fetchList () {
                getMessageList(this.page).then(data => {
                    if (data.status.code === 0) {
                        this.dataList = data.data.docs;
                        this.dataList.forEach(content => {
                            if (content.type === 0) {
                                content.to = '全服';
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        created () {
            this.fetchList();
        }
    };
</script>

<style scoped lang="less">
    .table-content {
        margin-top:15px;
    }
</style>
