<script>
export default {
  name: 'g3RelationshipGraph',
  data() {
    return {
      itemPosition: [],
      linePosition: [],
      itemListInfo: {
        total: 0,
      },
      // 线集合
      lineList: [],
      mainItem: {
        id: '',
        style: '',
        toUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      },
      // 连接项集合
      linkItemList: [],
      tempX: new Set(),
      tempY: new Set(),
      isDragging: false,
      mainCoordinate: {
        x: 0,
        y: 0,
      },
    };
  },
  directives: {
    draggable: {
      bind(el, binding, vnode) {
        let item = binding.value;
        let x = 0,
            y = 0;

        el.addEventListener('mousedown', (e) => {
          x = e.clientX - el.getBoundingClientRect().left;
          y = e.clientY - el.getBoundingClientRect().top;

          el.style.zIndex = '999999';
          el.style.cursor = 'grabbing';
          vnode.context.startDrag(e);
        });

        document.addEventListener('mousemove', (e) => {
          let find = vnode.context.linkItemList.find((obj) => obj.id === item.id);
          if (find.isDragging) {
            const newX = e.clientX - x;
            const newY = e.clientY - y - 50;
            let line = vnode.context.lineList.find((obj) => obj.node === item.id);

            vnode.context.$nextTick(() => {
              find.style = `left:${newX}px;top:${newY}px;`;
              line.style = vnode.context.generateLineAxis(vnode.context.mainCoordinate, {
                x: newX,
                y: newY,
              });
            });
          }
        });

        document.addEventListener('mouseup', () => {
          el.style.zIndex = '';
          el.style.cursor = 'pointer';
          vnode.context.stopDrag(item);
        });
      },
    },
  },
  props: {
    lineStyle: {
      type: Object,
    },
    lightenLineStyle: {
      type: Object,
    },
    width: {
      type: Number,
      required: true,
      default: 1000,
    },
    height: {
      type: Number,
      required: true,
      default: 800,
    },
  },
  created() {
    this.linkItemList = [
      {
        toUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        itemStyle: '',
        isDragging: false,
        id: '1',
      },
      {
        toUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        itemStyle: '',
        isDragging: false,
        id: '2',
      },
      {
        toUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        itemStyle: '',
        isDragging: false,
        id: '3',
      },
      {
        toUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        itemStyle: '',
        isDragging: false,
        id: '4',
      },
      {
        toUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        itemStyle: '',
        isDragging: false,
        id: '5',
      },
    ];
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const maxOffsetTop = this.$refs.graphBoard.offsetTop + this.$refs.graphBoard.offsetHeight;
      const maxOffsetLeft = this.$refs.graphBoard.offsetLeft + this.$refs.graphBoard.offsetWidth;
      this.mainCoordinate = {x: maxOffsetLeft / 2, y: maxOffsetTop / 2};
      this.tempY.add(this.mainCoordinate.y);
      this.tempX.add(this.mainCoordinate.x);
      this.mainItem.style = `top:${this.mainCoordinate.y}px; left:${this.mainCoordinate.x}px;`;
      this.linkItemList.forEach((item) => {
        let axis = this.generateNodeAxis(maxOffsetLeft, maxOffsetTop);
        item.style = `left:${axis.x}px;top:${axis.y}px;`;
        this.lineList.push({node: item.id, style: this.generateLineAxis(this.mainCoordinate, axis)});
      });
    },
    generateNodeAxis(maxX, maxY) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (maxX - 100)).toFixed(4);
      } while (this.tempX.has(x));
      do {
        y = Math.floor(Math.random() * (maxY - 100)).toFixed(4);
      } while (this.tempY.has(y));
      this.tempY.add(y);
      this.tempX.add(x);
      return {x, y};
    },
    generateLineAxis(mainAxis, nodeAxis) {
      let width = Math.sqrt(Math.pow(mainAxis.x - nodeAxis.x, 2) + Math.pow(mainAxis.y - nodeAxis.y, 2));
      let radians = Math.atan2(mainAxis.y - nodeAxis.y, mainAxis.x - nodeAxis.x);
      let x = parseFloat(nodeAxis.x) + 25;
      let y = parseFloat(nodeAxis.y) + 25;
      let degrees = radians * (180 / Math.PI);
      return `left:${x}px;top:${y}px;width:${width}px;transform: rotate(${degrees}deg);`;
    },
    startDrag(item) {
      item.isDragging = true;
    },
    stopDrag(item) {
      item.isDragging = false;
    },
  },
  render(h) {
    const graphBoardStyle = {
      position: 'relative',
      width: this.width + 'px',
      height: this.height + 'px',
    };

    const mainItem = h('div', {
      class: 'main-item',
      style: this.mainItem.style,
    }, [
      h('img', {
        attrs: {
          src: this.mainItem.toUrl,
        },
      }),
    ]);

    const draggableItems = this.linkItemList.map((item, index) => {
      return h('div', {
        class: 'item draggable',
        style: item.style,
        directives: [
          {
            name: 'draggable',
            value: item,
          },
        ],
        on: {
          mousedown: () => this.startDrag(item),
          mouseup: () => this.stopDrag(item),
        },
        key: index,
        ref: 'item',
      }, [
        h('img', {
          attrs: {
            src: item.toUrl,
          },
        }),
      ]);
    });

    const lines = this.lineList.map((item, index) => {
      return h('div', {
        class: 'line',
        style: item.style,
        key: new Date().getTime() + index,
      });
    });

    // final
    return h('div', {
      ref: 'graphBoard',
      style: graphBoardStyle,
    }, [mainItem, ...draggableItems, ...lines]);
  }
}
</script>
<style scoped lang="less">
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 50;
}


.line {
  position: absolute;
  border: 0.5px solid #444C56;
  z-index: 5;
  transform-origin: 0 0;
}

.line:hover {
  cursor: pointer;
  border-color: #f7ff00;
}

.item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  background: #3a8c3f;
  z-index: 10;
}

.main-item {
  border: 1px solid #258DF2;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  background: #3a8c3f;
  z-index: 10;
}

.item:hover {
  border: 1px solid #258DF2;
  cursor: pointer;
}

.draggable {
  color: #fff;
  text-align: center;
  cursor: pointer;
  position: absolute;
}
</style>
