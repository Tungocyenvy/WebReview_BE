const Category = require('../models/categoryModel');
const Group = require('../models/groupModel');
const Post = require('../models/postModel');
const PostService = require('./PostService');
// const GroupService = require('./GroupService');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const removeVN = (Text) => {
  return Text.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
//Tạo id cho cate
const getCateId = (CateName) => {
  let res = CateName.split(' ');
  //res=removeVN(res);
  let result = '';
  for (const i in res) {
    result = result + res[i].charAt(0);
  }
  return removeVN(result);
};

//Lấy cate theo từng trang
const getCategorybyGroupId = async (body) => {
  let { GroupId, Status } = body;
  //const Id = 'Review';
  try {
    console.log('FUNC GET CATEGORY BY GROUP ID');
    const category = (await getCategory(Status)).data;
    if (category) {
      let post = category.find((x) => x.id === GroupId);
      console.log(post);
      if (post) {
        console.log(1);
        return {
          msg: 'Lấy tất cả category của ' + GroupId + ' thành công!',
          statusCode: 200,
          data: post,
        };
      } else {
        console.log(0);
        return {
          msg: 'Không có category nào trong group!',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'Không có category nào!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Lấy cate cho tất cả các trang {admin}
//Status false lấy dành cho khôi phục
//true lấy category hiện có
const getCategory = async (Status) => {
  //const Id = 'Review';
  console.log('getCategory');
  try {
    const category = await Category.find({});
    if (category) {
      const data = category[0].Group;
      let Result = [];
      //Lấy tên group
      const lstGroup = await Group.find({ Status: true });
      if (lstGroup) {
        for (const i in data) {
          let group = lstGroup.find((x) => x._id === data[i].id);
          //let group = await Group.findOne({ _id: data[i].id });
          if (group) {
            let lstCate = data[i].Category;
            lstCate = lstCate.filter((x) => String(x.Status) === Status);
            if (lstCate) {
              let cate = {};
              cate.id = data[i].id;
              cate.Name = group.Name;
              cate.Category = lstCate;
              Result.push(cate);
            }
          }
        }
        console.log(Result);
        if (!Result) {
          return {
            msg: 'Không có category nào!',
            statusCode: 300,
          };
        } else {
          return {
            msg: 'Lấy tất cả category thành công!',
            statusCode: 200,
            data: Result,
          };
        }
      }
    } else {
      return {
        msg: 'Không có category nào!',
        statusCode: 300,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Thêm category
const createCategory = async (body) => {
  let { GroupId, CateName } = body;
  try {
    const lstGroup = await Group.find({ _id: GroupId, Status: true });
    console.log(lstGroup);
    if (lstGroup.length <= 0) {
      return {
        msg: 'GroupId không tồn tại!',
        statusCode: 300,
      };
    } else {
      const category = await Category.find({});
      const _id = category[0]._id;
      let group = category[0].Group;
      let data = group.find((x) => x.id === GroupId);
      console.log(data);

      //Tạo id cho cate
      let id = getCateId(CateName);
      let tmp = { id: id, Name: CateName };
      //Nếu group này chưa có category nào thì thêm mới
      if (!data) {
        let cate = { id: GroupId, Category: tmp };
        group.push(cate);
      }
      //Group đã có category rồi
      else {
        if (data.Category.find((x) => x.Name === CateName)) {
          return {
            msg: 'Tên danh mục này đã tồn tại!',
            statusCode: 300,
          };
        }

        //check id có trùng hay không
        let check = data.Category.find((x) => x.id === id);
        while (check) {
          const randomIndex = getRandomInt(0, 10);
          id = id + randomIndex;
          check = data.Category.find((x) => x.id === id);
        }
        tmp = { id: id, Name: CateName };

        data.Category.push(tmp);
        group = group.map((x) => (x.id === GroupId ? data : x));
      }
      await Category.findOneAndUpdate({ _id }, { Group: group });
      const resave = (await getCategory('true')).data;
      console.log(resave);
      if (resave) {
        return {
          msg: 'Thêm danh mục thành công!',
          statusCode: 200,
          data: resave,
        };
      }
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};

//Sửa category
const updateCategory = async (body, CateId) => {
  let { GroupId, CateName } = body;
  //let {CateId}=CateId;
  console.log(CateId);
  try {
    const category = await Category.find({});
    if (category) {
      const _id = category[0]._id;
      let group = category[0].Group;
      let data = group.find((x) => x.id === GroupId);
      console.log(data);

      if (!data) {
        return {
          msg: 'GroupId không tồn tại!',
          statusCode: 300,
        };
      }
      let tmp = { id: CateId, Name: CateName };

      let cate = data.Category;
      if (cate.find((x) => x.Name === CateName)) {
        return {
          msg: 'Tên danh mục này đã tồn tại!',
          statusCode: 300,
        };
      }
      cate = cate.map((x) => (x.id === CateId ? tmp : x));
      data.Category = cate;
      group = group.map((x) => (x.id === GroupId ? data : x));
      await Category.findOneAndUpdate({ _id }, { Group: group });
      const resave = (await getCategory('true')).data;
      console.log(resave);
      if (resave) {
        return {
          msg: 'Chỉnh sửa danh mục ' + CateId + ' thành công!',
          statusCode: 200,
          data: resave,
        };
      }
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};

//xóa category
/* bỏ thay vì xóa thì change status của category */
/*const deleteCategory = async (body, CateId) => {
  let { GroupId } = body;
  console.log(GroupId);
  try {
    const category = await Category.find({});
    const _id = category[0]._id;
    let group = category[0].Group;
    let data = group.find((x) => x.id === GroupId);
    console.log(data);

    if (data.length <= 0) {
      return {
        msg: 'GroupId không tồn tại!',
        statusCode: 300,
      };
    }
    //let tmp = { "id": CateId, "Name": CateName };

    let cate = data.Category;
    //items.findIndex(element => element.id === item.id)
    //cate = ;
    cate.splice(
      cate.findIndex((x) => x.id === CateId),
      1,
    );
    console.log(cate);
    data.Category = cate;
    group = group.map((x) => (x.id === GroupId ? data : x));
    await Category.findOneAndUpdate({ _id }, { Group: group });
    const resave = (await getCategory()).data;
    console.log(resave);
    if (resave) {
      return {
        msg: 'xóa ' + CateId + ' thành công!',
        statusCode: 200,
        data: resave,
      };
    }
    // }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình xóa',
      statusCode: 300,
    };
  }
};*/

//đổi status category thành false ~ xóa cate
//đổi status category thành true ~ khôi phục cate
const changeStatusCate = async (body, CateId) => {
  let { GroupId, Status } = body;
  try {
    const category = await Category.find({});
    console.log(category);
    if (category) {
      let _id = category[0]._id;
      let group = category[0].Group;
      let lstGroup = group.find((x) => x.id === GroupId);

      //Kiểm tra GroupId hợp lệ
      if (!lstGroup) {
        return {
          msg: 'GroupId không tồn tại!',
          statusCode: 300,
        };
      }

      //Kiểm tra CateId hợp lệ
      let tmp = lstGroup.Category.find((x) => x.id === CateId);
      console.log(tmp);
      if (!tmp) {
        return {
          msg: 'danh mục không tồn tại!',
          statusCode: 300,
        };
      }
      tmp.Status = Status;
      //Đổi status trong category
      let cate = lstGroup.Category;
      cate = cate.map((x) => (x.id === CateId ? tmp : x));
      lstGroup.Category = cate;
      group = group.map((x) => (x.id === GroupId ? lstGroup : x));
      await Category.findOneAndUpdate({ _id }, { Group: group });

      //Đổi isshow cho post
      await recoveryPost({ GroupId, CateId, Status });

      let message = 'Xóa danh mục ' + CateId + ' thành công!';

      if (String(Status) === 'true') {
        message = 'Khôi phục danh mục ' + CateId + ' thành công!';
        Status = 'false';
      } else {
        Status = 'true';
      }
      //Status!=Status;
      console.log(Status);
      const resave = (await getCategory(Status)).data;
      console.log(resave);
      if (resave) {
        return {
          msg: message,
          statusCode: 200,
          data: resave,
        };
      }
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};

//Khôi phục lại bài viết (dùng cho khôi phục group và khôi phục cate)
const recoveryPost = async (body) => {
  let { GroupId, CateId, Status } = body;
  //lấy bài viêt
  const posts = await Post.find({});
  const _id = posts[0]._id;
  let group = posts[0].Group;
  console.log(GroupId);
  //loc bai viet theo group
  const dataGroup = group.find((e) => e.Id === GroupId);
  //const post = dataGroup[0].Post;
  console.log(CateId);
  if (dataGroup) {
    let lstPost = dataGroup.Post.filter((x) => x.CategoryId === CateId);
    console.log(lstPost);
    if (lstPost.length > 0) {
      {
        for (const i in lstPost) {
          tmp = lstPost[i];
          tmp.IsShow = Status;
          let PostId = tmp.Id;
          //Đổi IsShow trong post
          let post = dataGroup.Post;
          post = post.map((x) => (x.Id === PostId ? tmp : x));
          dataGroup.Post = post; //Cập nhập vào post
          group = group.map((x) => (x.Id === GroupId ? dataGroup : x)); //cập nhập vào group
          await Post.findOneAndUpdate({ _id }, { Group: group });
        }
      }
    }
  }
};

module.exports = {
  getCategorybyGroupId,
  getCategory,
  createCategory,
  updateCategory,
  changeStatusCate,
};
